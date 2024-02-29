import { json } from "@sveltejs/kit";
import * as edgedb from "edgedb";
import  e from '../../../dbschema/edgeql-js';
// import { Skills } from "../../../dbschema/edgeql-js/modules/default";

const client = edgedb.createClient();

export async function GET() {
   let query = e.select(e.PersonalDetails, () => ({
      id: true,
      first_name: true,
      last_name: true,
      designation: true,
      email: true,
      phone: true
   }))
   const result = await query.run(client)
   return new Response(JSON.stringify(result))
}

export async function POST(data) {
   // let query = e.insert(e.PersonalDetails, {
   //    first_name: data.first_name,
   //    last_name: data.last_name,
   //    designation: data.designation,
   //    dob: data.dob,
   //    skills: data.skills.map(skill => (
   //       e.insert(e.Skills, {
   //       skill_name: skill.skill_name,
   //       skill_level: skill. skill_level
   //    })
   //    ))
   // })PersonalDetails a
   let a = await  data.request.json()
   console.log('dataaaaaaaaaaaaaaaa', a)
   let query = e.params({ person: e.json }, (params) => {
      return e.for(e.json_array_unpack(params.person), (person) => {
         return e.insert(e.PersonalDetails, {
            first_name: e.cast(e.str,person.first_name),
            last_name: e.cast(e.str,person.last_name),
            designation: e.cast(e.str,person.designation),
            dob: e.cast(e.cal.local_date, person.dob),
            email: e.cast(e.str, person.email),
            phone: e.cast(e.str, person.phone),
            summary: e.cast(e.str, person.summary),
            address: e.insert(e.Address, {
               city: e.cast(e.str, person.address.city),
               country: e.cast(e.str, person.address.country),
               pincode: e.cast(e.str, person.address.pincode)
            }),
            education: e.assert_distinct(e.for(e.json_array_unpack(person.education), (edu) => {
               return e.insert(e.Education, {
                  course_name: e.cast(e.str, edu.course_name),
                  institute_name: e.cast(e.str, edu.institute_name),
                  location: e.cast(e.str, edu.location),
                  start_month: e.cast(e.str, edu.start_month),
                  start_year: e.cast(e.str, edu.start_year),
                  end_month: e.cast(e.str, edu.end_month),
                  end_year: e.cast(e.str, edu.end_year),
               })
            })),
            skills: e.assert_distinct(e.for(e.json_array_unpack(person.skills), (skill) => {
               return e.insert(e.Skills, {
                  skill_name: skill.skill_name ? e.cast(e.str, skill.skill_name) : null,
                  skill_level: skill.skill_level ? e.cast(e.str, skill.skill_level) : null
               })
            })),
            work_experience: e.assert_distinct(e.for(e.json_array_unpack(person.work_experience), (exp) => {
               return e.insert(e.WorkExperience, {
                  employer: e.cast(e.str, exp.employer),
                  job_title: e.cast(e.str, exp.job_title),
                  job_description: e.cast(e.str, exp.job_description),
                  start_month: e.cast(e.str, exp.start_month),
                  start_year: e.cast(e.str, exp.start_year),
                  end_month: e.cast(e.str, exp.end_month),
                  end_year: e.cast(e.str, exp.end_year),
               })
            })),
            certifications: e.assert_distinct(e.for(e.json_array_unpack(person.certifications), (cert) => {
               return e.insert(e.Certifications, {
                  certificate_name: e.cast(e.str, cert.certificate_name),
                  url: e.cast(e.str, cert.url),
                  start_year: e.cast(e.str, cert.start_year),
                  end_year: e.cast(e.str, cert.end_year)
               })
            })),
            social_media_profile: e.assert_distinct(e.for(e.json_array_unpack(person.social_media_profile), (sm) => {
               return e.insert(e.SocialMediaProfile, {
                  network: e.cast(e.str, sm.network),
                  url: e.cast(e.str,sm.url)
               })
            }))
         });
      })  
   });
   
   console.log('query', query)
   // const result = await query.run(client)
   const result = await query.run(client, {person: Array.isArray(a) ? a : [a]})
   console.log('result', result)
   return new Response(JSON.stringify(result))
}

