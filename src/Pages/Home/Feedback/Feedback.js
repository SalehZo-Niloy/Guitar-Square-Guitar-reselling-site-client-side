import React from 'react';
import toast from 'react-hot-toast';

const Feedback = () => {

    //----------------------------
    // inserting feedback to database
    //----------------------------
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const feedback = form.feedback.value;
        // console.log(feedback);
        fetch('https://assignment-12-server-two.vercel.app/feedback', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ feedback })
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    toast.success('Thanks for your Feedback');
                }
            })
            .catch(e => console.error(e));
    }

    return (
        <div className='w-11/12 md:w-9/12 mx-auto my-12 rounded-xl overflow-hidden'>
            <div className="hero" style={{ backgroundImage: `url("https://i.ibb.co/CsbW66s/electric-guitar-background-with-amplifier-3d-rendering-1419-2411.webp")` }}>
                <div className="hero-overlay bg-opacity-80"></div>
                <div className="hero-content text-center text-neutral-content p-0 my-4 md:my-8 w-11/12">
                    <div>
                        <h1 className="mb-5 mt-2 text-lg md:text-2xl text-accent font-semibold w-full">Please provide your valuable feedback and contribute in improving <br /> <strong className='text-primary'>GUITAR SQUARE</strong></h1>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <textarea type='text' name='feedback' className="textarea textarea-bordered w-full" placeholder="Your feedback"></textarea>
                            </div>
                            <div className='flex justify-end mt-2'>
                                <button className="btn btn-primary btn-sm">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feedback;