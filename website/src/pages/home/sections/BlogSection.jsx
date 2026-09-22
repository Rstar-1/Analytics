import React from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Button from '../../../components/common/Button';
import Icon from '../../../components/common/Icon';
import Heading from '../../../components/layout/generic/Heading';
import { blogCMS } from '../../../utils/apiData';

const BlogSection = () => {
    const { heading, featuredPost, secondaryPosts } = blogCMS;

    return (
        <Container style={{ background: 'var(--forth)' }}>
            <div className='w-full py-40'>
                <Heading
                    version="v2"
                    tag={heading.tag}
                    title={heading.title}
                    actionText={heading.actionText}
                />

                <div className='flex sm-grid-cols-1 items-start gap-12 w-full mt-30'>
                    <div className='relative rounded-10 overflow-hidden h-550 sm-h-400 w-60 sm-w-full'>
                        <Image
                            src={featuredPost.image}
                            alt={featuredPost.title}
                            className="top-0 left-0 w-full h-full object-cover filter-b4"
                            loading="lazy"
                            decoding="async"
                        />

                        <div className='absolute top-0 left-0'>
                            <p className='mini-text text-white bg-primary w-max px-14 py-4 rounded-20 flex items-center gap-8 font-500 uppercase m-30 sm-m-14'>
                                <Icon name='Box' width="14" height="14" className="text-white" />
                                {featuredPost.tag}
                            </p>
                        </div>

                        <div className='absolute bottom-0 left-0'>
                            <div className='m-30 sm-m-14'>
                                <div className='flex items-center gap-12'>
                                    <div className='flex items-center gap-4'>
                                        <Icon name="Clock" width="16" height="16" className="text-white" />
                                        <p className='small-text text-white'>{featuredPost.date}</p>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <Icon name="Reviews" width="16" height="16" className="text-white" />
                                        <p className='small-text text-white'>{featuredPost.comments}</p>
                                    </div>
                                </div>

                                <h3 className='head-text text-white font-600 line-clamp3 uppercase mt-16 sm-mt-4'>
                                    {featuredPost.title}
                                </h3>

                                <p className='para-text text-white font-400 mt-10 sm-line-clamp3 w-full'>
                                    {featuredPost.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='grid-cols-1 w-40 sm-w-full'>
                        {secondaryPosts.map((post, idx) => (
                            <div
                                key={post.id}
                                className={`flex items-start gap-12 ${idx === 0 ? 'bordb pb-20' : 'pt-20'}`}
                            >
                                <div className='relative w-45 sm-w-40 h-250 sm-h-200 rounded-10 overflow-hidden'>
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        className='w-full h-full object-cover flex'
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className='absolute top-0 left-0'>
                                        <p className='mini-text text-white bg-primary w-max px-14 py-4 sm-px-10 sm-py-2 rounded-20 flex items-center gap-8 font-500 uppercase m-12 sm-m-8'>
                                            <Icon name='Box' width="14" height="14" className="text-white" />
                                            {post.tag}
                                        </p>
                                    </div>
                                </div>

                                <div className='w-55 sm-w-60'>
                                    <div className='flex items-center gap-12 mt-4'>
                                        <div className='flex items-center gap-4'>
                                            <Icon name="Clock" width="12" height="12" className="text-dark" />
                                            <p className='mini-text text-dark'>{post.date}</p>
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <Icon name="Reviews" width="12" height="12" className="text-dark" />
                                            <p className='mini-text text-dark'>{post.comments}</p>
                                        </div>
                                    </div>

                                    <h4 className='title-text text-dark font-600 line-clamp2 mt-6 sm-mt-2'>
                                        {post.title}
                                    </h4>

                                    <p className='small-text text-gray font-400 mt-8 sm-mt-4 line-clamp4 sm-line-clamp3'>
                                        {post.description}
                                    </p>

                                    <Button
                                        text={post.buttonText || "Read more"}
                                        version="v2"
                                        bg="dark"
                                        color="white"
                                        className='rounded-30 mt-16'
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default React.memo(BlogSection);
