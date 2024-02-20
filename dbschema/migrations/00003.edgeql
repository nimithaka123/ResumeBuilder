CREATE MIGRATION m1cm3s7yzk5oi6px434araslf55yng2ctbilx2h3wfw24h7o6vdvca
    ONTO m1i6fwstucwna7iipmkq4doy2tcagp27zojzzwsfyjz37rqxcwltcq
{
  ALTER TYPE default::PersonalDetails {
      ALTER PROPERTY email {
          SET REQUIRED USING (<std::str>{});
      };
      ALTER PROPERTY phone {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
