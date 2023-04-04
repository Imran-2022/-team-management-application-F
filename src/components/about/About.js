import React from 'react';
import Layout from '../../Layout';
import img1 from '../../assets/officelogoabout.png';
import img2 from '../../assets/officelogoabout1.png';

const About = () => {

    return (
        <Layout title="About" className="bg-[#f5f7f9] h-[89.9vh]">
            <section className="mx-60 py-12">
                <div className="bg-white shadow-sm rounded gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                    <div className="font-light text-gray-500 sm:text-lg">
                        <h2 className="mb-4 text-4xl text-gray-900 font-thin first-letter:text-7xl first-letter:font-bold first-letter:text-slate-900
  first-letter:mr-3 first-letter:float-left">We are here,Only for you to help you guy's |</h2>
                        <p className="mb-4">We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need.</p>
                        <p>We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <img className="w-full rounded-lg" src={img1} alt="office content 1" />
                        <img className="mt-4 w-full rounded-lg lg:mt-10" src={img2} alt="office content 2" />
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default About;