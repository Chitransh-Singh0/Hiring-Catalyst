import React from "react";
import { JobImg } from "../assets";

const About = () => {
  return (
    <div className='container mx-auto flex flex-col gap-8 2xl:gap-14 py-6 '>
      <div className='w-full flex flex-col-reverse md:flex-row gap-10 items-center p-5'>
        <div className='w-full md:2/3 2xl:w-2/4'>
          <h1 className='text-3xl text-blue-600 font-bold mb-5'>About Us</h1>
          <p className='text-justify leading-7'>
            At Hiring Catalyst, we believe that finding the perfect job shouldn’t be a daunting task but an empowering journey.
            Our platform is designed to bridge the gap between job seekers and employers, fostering connections that lead to meaningful and fulfilling careers.
            Whether you’re a recent graduate looking for your first opportunity or an experienced professional seeking new challenges, 
            Hiring Catalyst is here to streamline your job search process. We leverage advanced algorithms and data-driven insights to match candidates with roles
            that align with their skills, experience, and career aspirations. 
            Our mission is to transform the job-hunting experience by making it more efficient, transparent, and tailored to the individual needs of each user.
          </p>
        </div>
        <img src={JobImg} alt='About' className='w-auto h-[300px]' />
      </div>

      <div className='leading-8 px-5 text-justify'>
        <p>
        Hiring Catalyst is more than just a job finder platform; it’s a community where ambition meets opportunity. 
        We understand that today’s job market is competitive and ever-changing, which is why we are committed to staying ahead of industry
        trends and technological advancements. Our platform offers a personalized experience, connecting job seekers with employers who value 
        their unique talents and perspectives. Through our user-friendly interface, robust search features, and expert resources, we empower 
        users to take control of their career paths. At Hiring Catalyst, we are dedicated to making the job search process as seamless as possible,
         ensuring that every candidate finds a role that not only fits their skills but also ignites their passion.
        </p>
      </div>
    </div>
  );
};

export default About;