CREATE MIGRATION m12twp7qaobxyifj7kx7txxbs6gkvzpz3jier5jwwastzsdx5bcjha
    ONTO m1cm3s7yzk5oi6px434araslf55yng2ctbilx2h3wfw24h7o6vdvca
{
  ALTER TYPE default::PersonalDetails {
      CREATE REQUIRED PROPERTY summary_value: std::str {
          SET REQUIRED USING (<std::str>'');
      };
  };
};
