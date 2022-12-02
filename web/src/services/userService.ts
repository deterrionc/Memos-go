import { globalService, locationService } from ".";
import * as api from "../helpers/api";
import * as storage from "../helpers/storage";
import { UNKNOWN_ID } from "../helpers/consts";
import store from "../store";
import { setUser, patchUser, setHost, setOwner } from "../store/modules/user";
import { getSystemColorScheme } from "../helpers/utils";

const defaultSetting: Setting = {
  locale: "en",
  appearance: getSystemColorScheme(),
  memoVisibility: "PRIVATE",
  memoDisplayTsOption: "created_ts",
};

const defaultLocalSetting: LocalSetting = {
  isFoldingEnabled: true,
};

export const convertResponseModelUser = (user: User): User => {
  const setting: Setting = {
    ...defaultSetting,
  };
  const { localSetting: storageLocalSetting } = storage.get(["localSetting"]);
  const localSetting: LocalSetting = {
    ...defaultLocalSetting,
    ...storageLocalSetting,
  };

  if (user.userSettingList) {
    for (const userSetting of user.userSettingList) {
      (setting as any)[userSetting.key] = JSON.parse(userSetting.value);
    }
  }

  return {
    ...user,
    setting,
    localSetting,
    createdTs: user.createdTs * 1000,
    updatedTs: user.updatedTs * 1000,
  };
};

const userService = {
  getState: () => {
    return store.getState().user;
  },

  initialState: async () => {
    const { systemStatus } = globalService.getState();
    if (systemStatus.host) {
      store.dispatch(setHost(convertResponseModelUser(systemStatus.host)));
    }

    const ownerUserId = userService.getUserIdFromPath();
    if (ownerUserId) {
      const { data: owner } = (await api.getUserById(ownerUserId)).data;
      if (owner) {
        store.dispatch(setOwner(convertResponseModelUser(owner)));
      }
    }

    const { data } = (await api.getMyselfUser()).data;
    if (data) {
      const user = convertResponseModelUser(data);
      store.dispatch(setUser(user));
      if (user.setting.locale) {
        globalService.setLocale(user.setting.locale);
      }
      if (user.setting.appearance) {
        globalService.setAppearance(user.setting.appearance);
      }
    }
  },

  getCurrentUserId: () => {
    if (userService.isVisitorMode()) {
      return userService.getUserIdFromPath() || UNKNOWN_ID;
    } else {
      return userService.getState().user?.id || UNKNOWN_ID;
    }
  },

  isVisitorMode: () => {
    return !(userService.getUserIdFromPath() === undefined);
  },

  getUserIdFromPath: () => {
    const userIdRegex = /^\/u\/(\d+).*/;
    const result = locationService.getState().pathname.match(userIdRegex);
    if (result && result.length === 2) {
      return Number(result[1]);
    }
    return undefined;
  },

  doSignIn: async () => {
    const { data: user } = (await api.getMyselfUser()).data;
    if (user) {
      store.dispatch(setUser(convertResponseModelUser(user)));
    } else {
      userService.doSignOut();
    }
    return user;
  },

  doSignOut: async () => {
    store.dispatch(setUser());
    await api.signout();
  },

  getUserById: async (userId: UserId) => {
    const { data: user } = (await api.getUserById(userId)).data;
    if (user) {
      return convertResponseModelUser(user);
    } else {
      return undefined;
    }
  },

  upsertUserSetting: async (key: keyof Setting, value: any) => {
    await api.upsertUserSetting({
      key: key as any,
      value: JSON.stringify(value),
    });
    await userService.doSignIn();
  },

  upsertLocalSetting: async (key: keyof LocalSetting, value: any) => {
    storage.set({ localSetting: { [key]: value } });
    store.dispatch(patchUser({ localSetting: { [key]: value } }));
  },

  patchUser: async (userPatch: UserPatch): Promise<void> => {
    const { data } = (await api.patchUser(userPatch)).data;
    if (userPatch.id === store.getState().user.user?.id) {
      const user = convertResponseModelUser(data);
      store.dispatch(patchUser(user));
    }
  },

  deleteUser: async (userDelete: UserDelete) => {
    await api.deleteUser(userDelete);
  },
};

export default userService;
