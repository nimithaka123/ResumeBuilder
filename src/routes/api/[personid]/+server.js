import { json } from "@sveltejs/kit";
import * as edgedb from "edgedb";
import  e from '../../../../dbschema/edgeql-js';

const client = edgedb.createClient();

/**
 * @param {{ id: any; }} body
 */
export async function GET(body) {
    console.log('body', body)
    let { params } = body
    let {personid} = params
    let query = e.select(e.PersonalDetails, () => ({
      //  first_name: true,
      //  last_name: true,
      //  designation: true,
      //  phone: true,
      ...e.PersonalDetails['*'],
      address: () => ({
         ...e.Address['*']
      }),
      education: () => ({
         ...e.Education['*']
      }),
      work_experience: () => ({
         ...e.WorkExperience['*']
      }),
      skills: () => ({
         ...e.Skills['*']
      }),
      certifications: () => ({
         ...e.Certifications['*']
      }),
      social_media_profile: () => ({
         ...e.SocialMediaProfile['*']
      }),
       filter_single: {id: personid}
    }))
    const result = await query.run(client)
    return new Response(JSON.stringify(result))
 }
 

 export async function DELETE(pid) {
    let {params} = pid
    let {personid} = params
    console.log('personId', personid)
    let query = e.delete(e.PersonalDetails, () => ({
        filter_single: {id: personid}
    }))
    const result = await query.run(client)
    return new Response(JSON.stringify(result))
 }


 export async function PUT(a) {
   console.log(a,"/n/n/n/n")
   let b = a.params.personid

   let data = await  a.request.json()
   console.log('dataaaaaaaaaaaaaaa', data)
   const work_experience = data.work_experience?.length ?  e.assert_distinct(
      e.set(
         ...data.work_experience.map((exp) => {
            if (exp.id)
               return e.update(e.WorkExperience, () => ({
                  filter_single: { id: exp.id },
                  set: {
                    employer: exp.employer,
                    job_title: exp.job_title,
                    job_description: exp.job_description,
                    start_month: exp.start_month,
                    start_year: exp.start_year,
                    end_month: exp.end_month,
                    end_year: exp.end_year
                  }
               }));
            else
               return e.insert(e.WorkExperience, {
                  employer: exp.employer,
                  job_title: exp.job_title,
                  job_description: exp.job_description,
                  start_month: exp.start_month,
                  start_year: exp.start_year,
                  end_month: exp.end_month,
                  end_year: exp.end_year
               });
         })
      )
   ) : null

   const skill = data.skills?.length ? e.assert_distinct(
      e.set(
         ...data.skills.map((sk) => {
            if (sk.id)
               return e.update(e.Skills, () => ({
                  filter_single: { id: sk.id },
                  set: {
                   skill_name: sk.skill_name,
                   skill_level: sk.skill_level
                  }
               }));
            else
               return e.insert(e.Skills, {
                  skill_name: sk.skill_name,
                  skill_level: sk.skill_level
               });
         })
      )
   ): null

   const certification = data.certifications?.length ? e.assert_distinct(
      e.set(
         ...data.certifications.map((cert) => {
            if (cert.id)
               return e.update(e.Certifications, () => ({
                  filter_single: { id: cert.id },
                  set: {
                   certificate_name: cert.certificate_name,
                   url: cert.url,
                   start_year: cert.start_year,
                   end_year: cert.end_year
                  }
               }));
            else
               return e.insert(e.Certifications, {
                  certificate_name: cert.certificate_name,
                  url: cert.url,
                  start_year: cert.start_year,
                  end_year: cert.end_year
               });
         })
      )
   ): null

   const social_media_profile = data.social_media_profile?.length ? e.assert_distinct(
      e.set(
         ...data.social_media_profile.map((sm) => {
            if (sm.id)
               return e.update(e.SocialMediaProfile, () => ({
                  filter_single: { id: sm.id },
                  set: {
                   network: sm.network,
                   url: sm.url
                  }
               }));
            else
               return e.insert(e.SocialMediaProfile, {
                  network: sm.network,
                  url: sm.network
               });
         })
      )
   ): null

   let query = e.update(e.PersonalDetails, () => ({
      filter_single: {id : b},
      set: {
         first_name: data.first_name,
         last_name: data.last_name,
         designation: data.designation,
         dob: data.dob,
         email: data.email,
         phone: data.phone,
         summary: data.summary,
         address: e.update(e.Address, () => ({
            filter_single: {id: data.address.id},
            set: {
               city: data.address.city,
               country: data.address.country,
               pincode: data.address.pincode
            }
         })),
         education: e.assert_distinct(
            e.set(
               ...data.education.map((edu) => {
                  if (edu.id)
                     return e.update(e.Education, () => ({
                        filter_single: { id: edu.id },
                        set: {
                          course_name: edu.course_name,
                          institute_name: edu.course_name,
                          location: edu.location,
                          start_month: edu.start_month,
                          start_year: edu.start_month,
                          end_month: edu.end_month,
                          end_year: edu.end_year
                        }
                     }));
                  else
                     return e.insert(e.Education, {
                        course_name: edu.course_name,
                        institute_name: edu.institute_name,
                        location: edu.location,
                        start_month: edu.start_month,
                        start_year: edu.start_year,
                        end_month: edu.end_month,
                        end_year: edu.end_year
                     });
               })
            )
         ),
         work_experience,
         skills: skill,
         certifications: certification,
         social_media_profile,   
      }
   }))
   const result = await query.run(client)
   console.log('resultttt', result)
   return new Response(JSON.stringify(result))



 }


