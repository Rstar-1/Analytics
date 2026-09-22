import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../common/Icon';

const Heading = ({
    version = "v1",
    tag = "WHAT WE PROVIDE",
    tagIcon = "Settings",
    title = "Navigating Tech Landscapes With Confidence.",
    subtitle,
    actionText,
    actionLink,
    onActionClick,
    actionIcon = "ArrowRight",
    align = "center",
    className = ""
}) => {
    const navigate = useNavigate();

    const handleActionClick = () => {
        if (onActionClick) onActionClick();
        else if (actionLink) navigate(actionLink);
    };

    const renderTag = (extraClass = "") => tag ? (
        <p className={`mini-text text-dark border-ec w-max px-18 py-6 rounded-20 flex items-center gap-8 font-600 uppercase mb-8 ${extraClass}`}>
            {tagIcon && <Icon name={tagIcon} width="14" height="14" className="text-primary" />}
            {tag}
        </p>
    ) : null;

    const renderedHeading = useMemo(() => {
        switch (version) {
            case "v2":
                return (
                    <div className={`w-full ${className}`}>
                        {renderTag()}
                        <div className="flex sm-grid-cols-1 items-center justify-between gap-12">
                            <div>
                                {title && <h2 className="text-dark font-600 head-text capitalize">{title}</h2>}
                                {subtitle && <p className="small-text text-gray mt-4">{subtitle}</p>}
                            </div>
                            {actionText && (
                                <p
                                    onClick={handleActionClick}
                                    className="text-dark font-600 small-text flex items-center gap-4 cursor-pointer hover-primary"
                                >
                                    {actionText}
                                    {actionIcon && <Icon name={actionIcon} width="18" height="18" />}
                                </p>
                            )}
                        </div>
                    </div>
                );

            case "v1":
            default:
                return (
                    <div className={`w-full ${align === 'center' ? 'text-center' : ''} ${className}`}>
                        {tag && (
                            <div className={align === 'center' ? 'justify-center flex' : 'flex'}>
                                {renderTag()}
                            </div>
                        )}
                        {title && (
                            <h2 className={`text-dark font-600 large-text uppercase ${align === 'center' ? 'w-80 sm-w-full mx-auto' : ''}`}>
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className={`small-text text-gray mt-8 ${align === 'center' ? 'mx-auto w-60' : ''}`}>
                                {subtitle}
                            </p>
                        )}
                    </div>
                );
        }
    }, [version, tag, tagIcon, title, subtitle, actionText, actionIcon, align, className]);

    return renderedHeading;
};

export default Heading;