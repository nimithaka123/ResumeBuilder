CREATE MIGRATION m1i6fwstucwna7iipmkq4doy2tcagp27zojzzwsfyjz37rqxcwltcq
    ONTO m1od7qdgiygbwnkz3bwezqh7mthe55hdycgjw2lkaoiv23cb2zvkcq
{
  ALTER TYPE default::PersonalDetails {
      CREATE PROPERTY email: std::str;
      CREATE PROPERTY phone: std::str;
  };
};
