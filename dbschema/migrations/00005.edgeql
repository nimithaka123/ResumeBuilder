CREATE MIGRATION m1smr63a5nyilw4blklkdnkfngu5ebu6kwmqdra3665slj2hmcfboq
    ONTO m12twp7qaobxyifj7kx7txxbs6gkvzpz3jier5jwwastzsdx5bcjha
{
  ALTER TYPE default::PersonalDetails {
      CREATE REQUIRED PROPERTY nick_name: std::str {
          SET REQUIRED USING (<std::str>'');
      };
  };
};
