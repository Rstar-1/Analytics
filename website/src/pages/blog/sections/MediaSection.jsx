import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Icon from '../../../components/common/Icon';
import Button from '../../../components/common/Button';
import Fields from '../../../components/forms/Fields';

const blogPosts = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
        date: '11 March 2025',
        comments: '18 Comments',
        title: 'Leading Through Change: Proven Lessons for Effective Change Management in Business',
        excerpt: 'Relive every thrilling moment from the recent activities — from the opening kickoff to the final whistle, with expert commentary, key plays, and unforgettable highlights.'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
        date: '08 March 2025',
        comments: '12 Comments',
        title: 'Harnessing Digital Transformation: A Roadmap to Future-Proof Your Business',
        excerpt: 'Follow our journey through the topic, and view all the action, capturing every victory, key scale, and defining moments as the squad claimed the ultimate championship glory.'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=80',
        date: '03 March 2025',
        comments: '15 Comments',
        title: 'Unlocking Business Potential: Innovative Solutions for Unmatched Success',
        excerpt: 'Our Youth Academy is dedicated to developing future football stars, providing top-tier coaching, essential skills, and a path to reach professional football success.'
    }
];

const categories = [
    { name: 'Branding', count: '08' },
    { name: 'Consulting', count: '12' },
    { name: 'Innovations', count: '15' },
    { name: 'Management', count: '10' },
    { name: 'SEO Marketing', count: '07' }
];

const recentPosts = [
    {
        id: 1,
        title: 'How To Stay Ahead Of The Business World',
        desc: 'How To Stay Ahead Of The Business World',
        date: 'March 05, 2025',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&q=80'
    },
    {
        id: 2,
        title: 'How Digital Twin Shaping The Workplace',
        desc: 'How To Stay Ahead Of The Business World',
        date: 'March 03, 2025',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=200&q=80'
    },
    {
        id: 3,
        title: 'How To Sustainability Into Your Strategy',
        desc: 'How To Stay Ahead Of The Business World',
        date: 'March 01, 2025',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=200&q=80'
    }
];

const popularTags = [
    'Growth', 'Business', 'Products', 'Lead', 'Impact', 'Focus', 'Tech', 'Optimise'
];

const MediaSection = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <Container>
            <div className='flex sm-grid-cols-1 items-start gap-12 w-full py-60'>
                <div className='w-70 sm-w-full pr-10 sm-pr-1'>
                    {blogPosts.map((post) => (
                        <article
                            key={post.id}
                            className='mb-40'
                        >
                            <div
                                onClick={() => navigate('/blog-detail')}
                                className='w-full h-450 sm-h-250 rounded-10 overflow-hidden mb-20 cursor-pointer'
                            >
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    className='flex object-cover h-full w-full'
                                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                />
                            </div>

                            <div className='flex items-center gap-12'>
                                <div className='flex items-center gap-6'>
                                    <Icon name="Customers" width="14" height="14" stroke="#666666" />
                                    <p className='small-text text-gray font-500'>{post.date}</p>
                                </div>
                                <div className='flex items-center gap-6 ml-10'>
                                    <Icon name="WhatsApp" width="14" height="14" stroke="#666666" />
                                    <p className='small-text text-gray font-500'>{post.comments}</p>
                                </div>
                            </div>

                            <h2
                                onClick={() => navigate('/blog-detail')}
                                className='text-dark font-600 head-text mt-2 line-clamp1 cursor-pointer'
                            >
                                {post.title}
                            </h2>

                            <p
                                className='text-gray font-400 small-text mt-14 sm-mt-6'
                            >
                                {post.excerpt}
                            </p>
                            <Button
                                text="Read More"
                                version="v2"
                                bg="primary"
                                color="white"
                                icon="ArrowUpRight"
                                iconPosition="right"
                                className="rounded-30 mt-12"
                                onClick={() => navigate('/blog-detail')}
                            />
                        </article>
                    ))}
                </div>

                <div className='w-30 sm-w-full pl-10 sm-pl-1'>
                    <div className='mb-25 bg-forth rounded-5 p-16'>
                        <h4 className='text-dark mid-text font-600 mb-10'>
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

                    <div className='mb-25'>
                        <h4 className='text-dark mid-text font-600'>
                            All Categories
                        </h4>
                        <div className='grid-cols-1 gap-10 mt-15'>
                            {categories.map((cat, idx) => (
                                <div
                                    key={idx}
                                    className='bg-forth rounded-5 p-15 flex justify-between items-center'
                                >
                                    <h5 className='text-dark headmini-text font-500'>{cat.name}</h5>
                                    <p className='text-light mini-text font-500'>({cat.count})</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='mb-25'>
                        <h4 className='text-dark mid-text font-600'>
                            Recent Post
                        </h4>
                        <div className='mt-15 grid-cols-1 gap-12'>
                            {recentPosts.map((post) => (
                                <div
                                    key={post.id}
                                    onClick={() => navigate('/blog-detail')}
                                    className='flex items-center gap-12 mb-10'
                                >
                                    <div className='w-35'>
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            className='w-full h-100px object-cover flex rounded-10'
                                        />
                                    </div>
                                    <div className='w-65'>
                                        <h5
                                            className='text-dark mid-text font-600 line-clamp1'
                                        >
                                            {post.title}
                                        </h5>
                                        <p className='text-gray mt-2 small-text font-500 line-clamp2'>
                                            {post.desc}
                                        </p>
                                        <p className='text-gray mt-4 mini-text font-400'>
                                            {post.date}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className='text-dark mid-text font-600'>
                            Popular Tags
                        </h4>
                        <div className='flex items-center gap-8 flex-wrap mt-12 bg-forth rounded-5 p-16'>
                            {popularTags.map((tag, idx) => (
                                <p
                                    key={idx}
                                    className='text-dark bg-white mini-text font-500 px-15 py-6 rounded-5'
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
        </Container >
    );
};

export default MediaSection;