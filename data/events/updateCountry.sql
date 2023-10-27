UPDATE [Country]
SET [CountryName]=@CountryName,
    [IsActive]=@IsActive,
    [CreatedBy]=@CreatedBy,
    [CreatedOn]=@CreatedOn,
    [ModifiedBy]=@ModifiedBy,
    [ModifiedOn]=@ModifiedOn
WHERE [PKId]=@countryId

SELECT [PKId]
      ,[CountryName]
      ,[IsActive]
      ,[CreatedBy]
      ,[CreatedOn]
      ,[ModifiedBy]
      ,[ModifiedOn]
  FROM [Country]
  WHERE [PKId]=@countryId