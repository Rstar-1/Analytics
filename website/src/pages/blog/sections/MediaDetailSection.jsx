import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Icon from '../../../components/common/Icon';
import Button from '../../../components/common/Button';
import Fields from '../../../components/forms/Fields';
import FormBuilder from '../../../components/forms/FormBuilder';

const categories = [
    { name: 'Branding', count: '06' },
    { name: 'Business', count: '03' },
    { name: 'Consulting', count: '08' },
    { name: 'Innovations', count: '04' },
    { name: 'Management', count: '02' },
    { name: 'SEO Marketing', count: '09' }
];

const recentPosts = [
    {
        id: 1,
        title: 'How To Stay Ahead Of The Business Curve',
        desc: 'How To Stay Ahead Of The Business World',
        date: 'March 20, 2025',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&q=80'
    },
    {
        id: 2,
        title: 'How Digital Tools Shaping The Workforce',
        desc: 'How To Stay Ahead Of The Business World',
        date: 'March 20, 2025',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80'
    },
    {
        id: 3,
        title: 'How To Sustainability Into Your Strategy',
        desc: 'How To Stay Ahead Of The Business World',
        date: 'March 20, 2025',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=200&q=80'
    }
];

const popularTags = ['Growth', 'Business', 'Insurance', 'Local', 'Impact', 'Finance', 'Tech', 'Optimize'];

const commentsList = [
    {
        id: 1,
        name: 'Sohail Tanvir',
        date: 'March 22, 2024 at 2:27 pm',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        text: 'Natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
    },
    {
        id: 2,
        name: 'Alex Planos',
        date: 'March 22, 2024 at 2:27 pm',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        text: 'Natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
    }
];

const commentFields = [
    {
        name: 'name',
        placeholder: 'Your Name',
        type: 'text',
        validation: { required: true }
    },
    {
        name: 'email',
        placeholder: 'Your Email',
        type: 'email',
        validation: { required: true }
    },
    {
        name: 'message',
        placeholder: 'Write Message',
        type: 'textarea',
        validation: { required: true }
    }
];

const MediaDetailSection = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleFormSubmit = (data) => {
        alert('Thank you for your comment!');
    };

    return (
        <Container>
            <div className="flex sm-grid-cols-1 items-start gap-12 w-full py-60">
                <div className="w-70 sm-w-full pr-10 sm-pr-1">
                    <Image
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                        alt="Main Article"
                        className="flex rounded-10 h-450 sm-h-300 w-full object-cover mb-20"
                    />

                    <div>
                        <div className="flex items-center gap-12 mb-12">
                            <div className="flex items-center gap-6">
                                <Icon name="Customers" width="14" height="14" stroke="#666666" />
                                <p className="small-text text-gray font-500">By Admin</p>
                            </div>
                            <div className="flex items-center gap-6 ml-10">
                                <Icon name="Box" width="14" height="14" stroke="#666666" />
                                <p className="small-text text-gray font-500">18 Dec, 2025</p>
                            </div>
                        </div>

                        <h3 className="text-dark font-600 head-text mt-2 mb-16 sm-mb-6">
                            Unlocking Business Growth with Innovative Solutions
                        </h3>

                        <p className="text-gray font-400 small-text mb-16">
                            Nunc lacinia et nisi non eleifend. Sed et erat eleifend lacus scelerisque molestie nec id libero. Suspendisse potenti. Vivamus vitae justo nunc. Aliquam erat volutpat. Ut sit amet justo nisl. Nunc hendrerit eros vitae justo hendrerit rhoncus.
                            <br />
                            This is a demonstration article discussing modern business strategies. All images, text, and contents belong exclusively to our portal and are designed for rich user engagement across mobile and desktop interfaces.
                        </p>
                    </div>

                    <div className="border-primary rounded-10 p-16 relative mb-20 sm-mb-14">
                        <p className="para-text font-500 text-dark">
                            "Pellentesque Sollicitudin Congue Dolor Iner Aliquam. Morbi Volutpat, Nisi Vel Molestie Ulnas Condimentum, Dapibus Aliquam Lacerat Tortor, Quis Egestas Nisl Ipsum Eu Risus. Praesent Eleifend Erat Et Amet Car Vehicula."
                        </p>
                    </div>

                    <p className="text-gray font-400 small-text mb-20">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit ut id nisl hendrerit orci. Pellentesque et erat sapien fringilla, mattis ligula consectetuer. Morbi orci mauris, maximus vitae ligula cursus, rhoncus eleifend augue. Morbi vel auctor mi ut hendrerit risus.
                    </p>

                    <div className="grid-cols-2 gap-12 mb-26 sm-mb-14">
                        <Image
                            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80"
                            alt="Office Discussion"
                            className="w-full h-250 sm-h-150 rounded-10 object-cover flex"
                        />

                        <Image
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
                            alt="Partnership Handshake"
                            className="w-full h-250 sm-h-150 rounded-10 object-cover flex"
                        />
                    </div>

                    <p className="text-gray font-400 small-text mb-24 sm-mb-14">
                        Nunc lacinia et nisi non eleifend. Sed et erat eleifend lacus scelerisque molestie nec id libero. Suspendisse potenti. Vivamus vitae justo nunc. Aliquam erat volutpat. Ut sit amet justo nisl.
                    </p>

                    <div className="flex justify-between items-center mb-40 border-y">
                        <div className="flex gap-8 items-center flex-wrap">
                            {['News', 'Business', 'Marketing'].map((tag) => (
                                <p
                                    key={tag}
                                    className="bg-forth text-dark mini-text font-500 px-14 py-4 rounded-20"
                                >
                                    {tag}
                                </p>
                            ))}
                        </div>

                        <div className="flex items-center gap-12">
                            <p className="small-text text-dark font-600">Share:</p>
                            <div className="flex gap-8 items-center">
                                {['Facebook', 'Twitter', 'Share2'].map((iconName, idx) => (
                                    <div
                                        key={idx}
                                    >
                                        <Icon name={iconName} width="20" height="20" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mb-30">
                        <h3 className="text-dark mid-text font-600 mb-30">
                            {commentsList.length.toString().padStart(2, '0')} Comments
                        </h3>

                        <div className="grid-cols-1 gap-12">
                            {commentsList.map((c) => (
                                <div key={c.id} className="flex gap-12 items-start bordb pb-20">
                                    <div className="w-15 sm-w-25">
                                        <Image src={c.avatar} alt={c.name} width="100px" height="100px" className="object-cover flex rounded-full" />
                                    </div>

                                    <div className="w-85 sm-w-75">
                                        <h5 className="text-dark mid-text font-600">
                                            {c.name}
                                        </h5>
                                        <p className="mini-text text-gray">{c.date}</p>
                                        <p className="text-warning para-text">★★★★★</p>

                                        <p className="small-text text-gray font-400 mt-4 sm-mt-2">
                                            {c.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-forth rounded-10 p-20 sm-p-14">
                        <h3 className="text-dark mid-text font-600 mb-20">
                            Leave A Comment
                        </h3>

                        <FormBuilder
                            fields={commentFields}
                            onSubmit={handleFormSubmit}
                            submitType="json"
                            col="2"
                            submitText="Post Comment"
                            buttonVersion="v2"
                            buttonBg="primary"
                            buttonClassName="flex items-center justify-start mt-20"
                        />
                    </div>
                </div>

                <div className="w-30 sm-w-full pl-10 sm-pl-1">
                    <div className="mb-25 bg-forth rounded-5 p-16">
                        <h4 className="text-dark mid-text font-600 mb-10">
                            Search
                        </h4>
                        <Fields
                            type="input"
                            placeholder="Search here..."
                            value={searchQuery}
                            onChange={(val) => setSearchQuery(val)}
                            icon="Search"
                            iconPosition="right"
                        />
                    </div>

                    <div className="mb-25">
                        <h4 className="text-dark mid-text font-600">
                            All Categories
                        </h4>
                        <div className="grid-cols-1 gap-10 mt-15">
                            {categories.map((cat, idx) => (
                                <div
                                    key={idx}
                                    className="bg-forth rounded-5 p-15 flex justify-between items-center"
                                >
                                    <h5 className="text-dark headmini-text font-500">{cat.name}</h5>
                                    <p className="text-light mini-text font-500">({cat.count})</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-25">
                        <h4 className="text-dark mid-text font-600">
                            Recent Post
                        </h4>
                        <div className="mt-15 grid-cols-1 gap-12">
                            {recentPosts.map((post) => (
                                <div
                                    key={post.id}
                                    onClick={() => navigate('/blog-detail')}
                                    className='flex items-center gap-12 mb-10'
                                >
                                    <div className="w-35">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-100px object-cover flex rounded-10"
                                        />
                                    </div>
                                    <div className="w-65">
                                        <h5 className="text-dark mid-text font-600 line-clamp1">
                                            {post.title}
                                        </h5>
                                        <p className="text-gray mt-2 small-text font-500 line-clamp2">
                                            {post.desc}
                                        </p>
                                        <p className="text-gray mt-4 mini-text font-400">
                                            {post.date}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-dark mid-text font-600">
                            Popular Tags
                        </h4>
                        <div className="flex items-center gap-8 flex-wrap mt-12 bg-forth rounded-5 p-16">
                            {popularTags.map((tag, idx) => (
                                <p
                                    key={idx}
                                    className="text-dark bg-white mini-text font-500 px-15 py-6 rounded-5 cursor-pointer"
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#FF4D00';
                                        e.currentTarget.style.color = '#FFFFFF';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#F3EFEE';
                                        e.currentTarget.style.color = '#141414';
                                    }}
                                >
                                    {tag}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default MediaDetailSection;
