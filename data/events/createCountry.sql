INSERT INTO [Country]
    (
        [CountryName],
        [IsActive],
        [CreatedBy],
        [CreatedOn],
        [ModifiedBy],
        [ModifiedOn]
    )
VALUES 
    (
        @CountryName,
        @IsActive,
        @CreatedBy,
        @CreatedOn,
        @ModifiedBy,
        @ModifiedOn
    )