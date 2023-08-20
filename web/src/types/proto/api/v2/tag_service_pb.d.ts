// @generated by protoc-gen-es v1.3.0
// @generated from file api/v2/tag_service.proto (package memos.api.v2, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message memos.api.v2.Tag
 */
export declare class Tag extends Message<Tag> {
  /**
   * @generated from field: string name = 1;
   */
  name: string;

  /**
   * @generated from field: int32 creator_id = 2;
   */
  creatorId: number;

  constructor(data?: PartialMessage<Tag>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "memos.api.v2.Tag";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Tag;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Tag;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Tag;

  static equals(a: Tag | PlainMessage<Tag> | undefined, b: Tag | PlainMessage<Tag> | undefined): boolean;
}

/**
 * @generated from message memos.api.v2.ListTagsRequest
 */
export declare class ListTagsRequest extends Message<ListTagsRequest> {
  /**
   * @generated from field: int32 creator_id = 1;
   */
  creatorId: number;

  constructor(data?: PartialMessage<ListTagsRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "memos.api.v2.ListTagsRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListTagsRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListTagsRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListTagsRequest;

  static equals(a: ListTagsRequest | PlainMessage<ListTagsRequest> | undefined, b: ListTagsRequest | PlainMessage<ListTagsRequest> | undefined): boolean;
}

/**
 * @generated from message memos.api.v2.ListTagsResponse
 */
export declare class ListTagsResponse extends Message<ListTagsResponse> {
  /**
   * @generated from field: repeated memos.api.v2.Tag tags = 1;
   */
  tags: Tag[];

  constructor(data?: PartialMessage<ListTagsResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "memos.api.v2.ListTagsResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListTagsResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListTagsResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListTagsResponse;

  static equals(a: ListTagsResponse | PlainMessage<ListTagsResponse> | undefined, b: ListTagsResponse | PlainMessage<ListTagsResponse> | undefined): boolean;
}

