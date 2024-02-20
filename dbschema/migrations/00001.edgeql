CREATE MIGRATION m1od7qdgiygbwnkz3bwezqh7mthe55hdycgjw2lkaoiv23cb2zvkcq
    ONTO initial
{
  CREATE TYPE default::Address {
      CREATE REQUIRED PROPERTY city: std::str;
      CREATE REQUIRED PROPERTY country: std::str;
      CREATE REQUIRED PROPERTY pincode: std::str;
  };
  CREATE TYPE default::Certifications {
      CREATE PROPERTY certificate_name: std::str;
      CREATE PROPERTY end_year: std::str;
      CREATE PROPERTY start_year: std::str;
      CREATE PROPERTY url: std::str;
  };
  CREATE TYPE default::Education {
      CREATE REQUIRED PROPERTY course_name: std::str;
      CREATE REQUIRED PROPERTY end_month: std::str;
      CREATE REQUIRED PROPERTY end_year: std::str;
      CREATE REQUIRED PROPERTY institute_name: std::str;
      CREATE REQUIRED PROPERTY location: std::str;
      CREATE REQUIRED PROPERTY start_month: std::str;
      CREATE REQUIRED PROPERTY start_year: std::str;
  };
  CREATE TYPE default::Skills {
      CREATE PROPERTY skill_level: std::str;
      CREATE PROPERTY skill_name: std::str;
  };
  CREATE TYPE default::SocialMediaProfile {
      CREATE PROPERTY network: std::str;
      CREATE PROPERTY url: std::str;
  };
  CREATE TYPE default::WorkExperience {
      CREATE PROPERTY employer: std::str;
      CREATE PROPERTY end_month: std::str;
      CREATE PROPERTY end_year: std::str;
      CREATE PROPERTY job_description: std::str;
      CREATE PROPERTY job_title: std::str;
      CREATE PROPERTY start_month: std::str;
      CREATE PROPERTY start_year: std::str;
  };
  CREATE TYPE default::PersonalDetails {
      CREATE LINK address: default::Address {
          ON SOURCE DELETE DELETE TARGET;
      };
      CREATE MULTI LINK certifications: default::Certifications {
          ON SOURCE DELETE DELETE TARGET;
      };
      CREATE MULTI LINK education: default::Education {
          ON SOURCE DELETE DELETE TARGET;
      };
      CREATE MULTI LINK skills: default::Skills {
          ON SOURCE DELETE DELETE TARGET;
      };
      CREATE MULTI LINK social_media_profile: default::SocialMediaProfile {
          ON SOURCE DELETE DELETE TARGET;
      };
      CREATE MULTI LINK work_experience: default::WorkExperience {
          ON SOURCE DELETE DELETE TARGET;
      };
      CREATE PROPERTY designation: std::str;
      CREATE REQUIRED PROPERTY dob: cal::local_date;
      CREATE REQUIRED PROPERTY first_name: std::str;
      CREATE REQUIRED PROPERTY last_name: std::str;
  };
};
