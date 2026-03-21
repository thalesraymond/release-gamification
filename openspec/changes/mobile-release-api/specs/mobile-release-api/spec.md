## ADDED Requirements

### Requirement: Retrieve Mobile Releases
The system MUST provide an endpoint `GET /mobile-releases` that returns a list of mobile releases. The repository methods retrieving this data MUST use MongoDB projections (e.g., `.project({ _id: 0, /* necessary fields */ })`) to minimize data transfer and memory usage, aligning with the architectural constraints.

#### Scenario: Successful mobile release listing
- **WHEN** a client makes a GET request to `/mobile-releases`
- **THEN** the system returns a paginated JSON array of mobile release objects.

### Requirement: Retrieve Mobile Release Details
The system MUST provide an endpoint `GET /mobile-releases/:id` that returns the details of a specific mobile release by its ID, including its associated `ReleaseItem`s.

#### Scenario: Successful mobile release details retrieval
- **WHEN** a client makes a GET request to `/mobile-releases/:id`
- **THEN** the system returns the mobile release details alongside an array of `ReleaseItem`s linked to that release.