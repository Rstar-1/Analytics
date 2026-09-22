import React from 'react';
import Icon from '../../components/common/Icon';
import Button from '../../components/common/Button';

const FlowHeader = ({ onSave, onPublish }) => {
  return (
    <div
      className="flex items-center justify-between px-16 py-10 bg-white bordb"
    >
      {/* Left: App Logo & Name */}
      <div className="flex items-center gap-10">
        <div
          className="icon-lg bg-forth"
        >
          <Icon name="Layers" width="18" height="18" stroke="var(--primary)" />
        </div>
        <div>
          <h5 className="font-600 headmini-text text-dark">
            INRA
          </h5>
          <p className="text-gray mini-text font-400">
            Supply Chain Analytics
          </p>
        </div>
      </div>

      <div>
        <h3
          className="font-600 headmini-text text-dark uppercase text-center"
        >
          B2B Customer Journey
        </h3>
        <p className="text-gray font-400 mini-text text-center">
          From Manufacturer to Customer – Seamless. Trusted.
        </p>
      </div>

      <div className="flex items-center gap-8">
        <Button
          text="Publish"
          bg="white"
          color="primary"
          border="primary"
          version="v2"
          onClick={onSave}
        />

        <Button
          icon="Send"
          bg="primary"
          color="white"
          border="primary"
          version="icon"
          className='p-8'
          onClick={onPublish}
        />
      </div>
    </div>
  );
};

export default React.memo(FlowHeader);
