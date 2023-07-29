// Code generated by protoc-gen-connect-go. DO NOT EDIT.
//
// Source: apiv2/tag_service.proto

package apiv2connect

import (
	context "context"
	errors "errors"
	connect_go "github.com/bufbuild/connect-go"
	apiv2 "github.com/usememos/memos/proto/gen/apiv2"
	http "net/http"
	strings "strings"
)

// This is a compile-time assertion to ensure that this generated file and the connect package are
// compatible. If you get a compiler error that this constant is not defined, this code was
// generated with a version of connect newer than the one compiled into your binary. You can fix the
// problem by either regenerating this code with an older version of connect or updating the connect
// version compiled into your binary.
const _ = connect_go.IsAtLeastVersion0_1_0

const (
	// TagServiceName is the fully-qualified name of the TagService service.
	TagServiceName = "memos.apiv2.TagService"
)

// These constants are the fully-qualified names of the RPCs defined in this package. They're
// exposed at runtime as Spec.Procedure and as the final two segments of the HTTP route.
//
// Note that these are different from the fully-qualified method names used by
// google.golang.org/protobuf/reflect/protoreflect. To convert from these constants to
// reflection-formatted method names, remove the leading slash and convert the remaining slash to a
// period.
const (
	// TagServiceListTagsProcedure is the fully-qualified name of the TagService's ListTags RPC.
	TagServiceListTagsProcedure = "/memos.apiv2.TagService/ListTags"
)

// TagServiceClient is a client for the memos.apiv2.TagService service.
type TagServiceClient interface {
	ListTags(context.Context, *connect_go.Request[apiv2.ListTagsRequest]) (*connect_go.Response[apiv2.ListTagsResponse], error)
}

// NewTagServiceClient constructs a client for the memos.apiv2.TagService service. By default, it
// uses the Connect protocol with the binary Protobuf Codec, asks for gzipped responses, and sends
// uncompressed requests. To use the gRPC or gRPC-Web protocols, supply the connect.WithGRPC() or
// connect.WithGRPCWeb() options.
//
// The URL supplied here should be the base URL for the Connect or gRPC server (for example,
// http://api.acme.com or https://acme.com/grpc).
func NewTagServiceClient(httpClient connect_go.HTTPClient, baseURL string, opts ...connect_go.ClientOption) TagServiceClient {
	baseURL = strings.TrimRight(baseURL, "/")
	return &tagServiceClient{
		listTags: connect_go.NewClient[apiv2.ListTagsRequest, apiv2.ListTagsResponse](
			httpClient,
			baseURL+TagServiceListTagsProcedure,
			opts...,
		),
	}
}

// tagServiceClient implements TagServiceClient.
type tagServiceClient struct {
	listTags *connect_go.Client[apiv2.ListTagsRequest, apiv2.ListTagsResponse]
}

// ListTags calls memos.apiv2.TagService.ListTags.
func (c *tagServiceClient) ListTags(ctx context.Context, req *connect_go.Request[apiv2.ListTagsRequest]) (*connect_go.Response[apiv2.ListTagsResponse], error) {
	return c.listTags.CallUnary(ctx, req)
}

// TagServiceHandler is an implementation of the memos.apiv2.TagService service.
type TagServiceHandler interface {
	ListTags(context.Context, *connect_go.Request[apiv2.ListTagsRequest]) (*connect_go.Response[apiv2.ListTagsResponse], error)
}

// NewTagServiceHandler builds an HTTP handler from the service implementation. It returns the path
// on which to mount the handler and the handler itself.
//
// By default, handlers support the Connect, gRPC, and gRPC-Web protocols with the binary Protobuf
// and JSON codecs. They also support gzip compression.
func NewTagServiceHandler(svc TagServiceHandler, opts ...connect_go.HandlerOption) (string, http.Handler) {
	tagServiceListTagsHandler := connect_go.NewUnaryHandler(
		TagServiceListTagsProcedure,
		svc.ListTags,
		opts...,
	)
	return "/memos.apiv2.TagService/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.URL.Path {
		case TagServiceListTagsProcedure:
			tagServiceListTagsHandler.ServeHTTP(w, r)
		default:
			http.NotFound(w, r)
		}
	})
}

// UnimplementedTagServiceHandler returns CodeUnimplemented from all methods.
type UnimplementedTagServiceHandler struct{}

func (UnimplementedTagServiceHandler) ListTags(context.Context, *connect_go.Request[apiv2.ListTagsRequest]) (*connect_go.Response[apiv2.ListTagsResponse], error) {
	return nil, connect_go.NewError(connect_go.CodeUnimplemented, errors.New("memos.apiv2.TagService.ListTags is not implemented"))
}
