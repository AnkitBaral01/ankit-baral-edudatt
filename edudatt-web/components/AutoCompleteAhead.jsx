'use client';

import React from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

const AutoCompleteAhead = ({
    options,
    label,
    placeholder = "",
    labelKey = "name",
    required = false,
    handleOnSelect,
    autoFocus = false,
    error = ''
}) => {
    return (
        <div className="w-full">
            {label && (
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                    {label} {required && <span className="text-red">*</span>}
                </label>
            )}
            <ReactSearchAutocomplete
                items={options}
                onSelect={handleOnSelect}
                onClear={() => handleOnSelect(null)}
                autoFocus={autoFocus}
                resultStringKeyName={labelKey}
                showIcon={false}
                showClear={true}
                maxResults={10}
                placeholder={placeholder}
                showItemsOnFocus={true}
                showNoResultsText={true}
                showNoResults={true}
                styling={{
                    borderRadius: "8px",
                    boxShadow: 0
                }}
                fuseOptions={{
                    threshold: 0.2,
                    minMatchCharLength: 0,
                }}
                className="z-10"
            />
            {/* Display the error message if there is one */}
            {error && <p className="text-xs font-semibold text-red mt-1">{error}</p>}
        </div>
    );
};

export default AutoCompleteAhead;
