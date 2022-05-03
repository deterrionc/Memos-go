package api

type Resource struct {
	ID int `json:"id"`

	// Standard fields
	CreatorID int   `json:"creatorId"`
	CreatedTs int64 `json:"createdTs"`
	UpdatedTs int64 `json:"updatedTs"`

	// Domain specific fields
	Filename string `json:"filename"`
	Blob     []byte `json:"blob"`
	Type     string `json:"type"`
	Size     int64  `json:"size"`
}

type ResourceCreate struct {
	// Standard fields
	CreatorID int

	// Domain specific fields
	Filename string `json:"filename"`
	Blob     []byte `json:"blob"`
	Type     string `json:"type"`
	Size     int64  `json:"size"`
}

type ResourceFind struct {
	ID *int `json:"id"`

	// Standard fields
	CreatorID *int `json:"creatorId"`

	// Domain specific fields
	Filename *string `json:"filename"`
}

type ResourceDelete struct {
	ID int
}

type ResourceService interface {
	CreateResource(create *ResourceCreate) (*Resource, error)
	FindResourceList(find *ResourceFind) ([]*Resource, error)
	FindResource(find *ResourceFind) (*Resource, error)
	DeleteResource(delete *ResourceDelete) error
}
