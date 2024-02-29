module default {
type PersonalDetails {
    required first_name: str;
    required last_name: str;
    required dob: cal::local_date;
    required email: str;
    required phone: str; 
    required summary: str;
    designation: str;
    address : Address {
        on source delete delete target
    }
    multi  education : Education {
        on source delete delete target
    }
    multi  work_experience : WorkExperience {
        on source delete delete target
    }
    multi skills : Skills {
        on source delete delete target
    }
    multi social_media_profile : SocialMediaProfile {
        on source delete delete target
    }
    multi  certifications : Certifications {
        on source delete delete target
    }
}
type Address {
    required city: str;
    required country: str;
    required pincode: str;
}
type Education {
    required institute_name: str;
    required course_name: str;
    required location: str;
    required start_month: str;
    required start_year: str;
    required end_month: str;
    required end_year:str;
}
type WorkExperience {
    job_title: str;
    employer: str;
    start_month: str;
    start_year: str;
    end_month: str;
    end_year: str;
    job_description: str;
}
type Skills {
    skill_name: str;
    skill_level: str;
}
type SocialMediaProfile {
    network: str;
    url: str;
}
type Certifications {
    certificate_name: str;
    url: str;
    start_year: str;
    end_year: str;
}
}
