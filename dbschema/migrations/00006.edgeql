CREATE MIGRATION m12yvmihws4vwtrh7j55oo2423t35lbmwyyhyptiabzihpl7ier2mq
    ONTO m1smr63a5nyilw4blklkdnkfngu5ebu6kwmqdra3665slj2hmcfboq
{
  ALTER TYPE default::PersonalDetails {
      ALTER PROPERTY nick_name {
          RENAME TO summary;
      };
  };
  ALTER TYPE default::PersonalDetails {
      DROP PROPERTY summary_value;
  };
};
