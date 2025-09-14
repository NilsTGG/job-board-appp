import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "../icons";

interface Option {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface AccessibleSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
  id: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}

const AccessibleSelect: React.FC<AccessibleSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  id,
  required = false,
  disabled = false,
  error,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [searchTerm, setSearchTerm] = useState("");

  const selectRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find((option) => option.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus management
  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
          handleSelect(filteredOptions[focusedIndex].value);
        }
        break;

      case "Escape":
        setIsOpen(false);
        setSearchTerm("");
        setFocusedIndex(-1);
        buttonRef.current?.focus();
        break;

      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        }
        break;

      case "ArrowUp":
        event.preventDefault();
        if (isOpen) {
          setFocusedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
        }
        break;

      case "Home":
        if (isOpen) {
          event.preventDefault();
          setFocusedIndex(0);
        }
        break;

      case "End":
        if (isOpen) {
          event.preventDefault();
          setFocusedIndex(filteredOptions.length - 1);
        }
        break;
    }
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm("");
    setFocusedIndex(-1);
    buttonRef.current?.focus();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setFocusedIndex(-1);
  };

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      <label htmlFor={id} className="block text-white font-medium mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>

      <button
        ref={buttonRef}
        id={id}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`
          w-full px-4 py-3 bg-gray-700 border rounded-lg text-white text-left
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200 flex items-center justify-between
          ${error ? "border-red-500" : "border-gray-600 hover:border-blue-500"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={`${id}-label`}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-required={required}
      >
        <span className={selectedOption ? "text-white" : "text-gray-400"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg">
          {/* Search input */}
          <div className="p-2 border-b border-gray-600">
            <input
              ref={searchRef}
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search options..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Search options"
            />
          </div>

          {/* Options list */}
          <ul
            ref={listRef}
            role="listbox"
            aria-labelledby={`${id}-label`}
            className="max-h-60 overflow-auto py-1"
          >
            {filteredOptions.length === 0 ? (
              <li className="px-4 py-2 text-gray-400 text-sm">
                No options found
              </li>
            ) : (
              filteredOptions.map((option, index) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={option.value === value}
                  className={`
                    px-4 py-2 cursor-pointer flex items-center justify-between
                    transition-colors duration-150
                    ${option.disabled ? "opacity-50 cursor-not-allowed" : ""}
                    ${
                      index === focusedIndex
                        ? "bg-blue-600 text-white"
                        : "text-gray-200 hover:bg-gray-600"
                    }
                    ${option.value === value ? "bg-blue-700 text-white" : ""}
                  `}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  onMouseEnter={() =>
                    !option.disabled && setFocusedIndex(index)
                  }
                >
                  <div>
                    <div className="font-medium">{option.label}</div>
                    {option.description && (
                      <div className="text-xs text-gray-400 mt-1">
                        {option.description}
                      </div>
                    )}
                  </div>
                  {option.value === value && (
                    <Check className="h-4 w-4 text-blue-400" />
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div
          id={`${id}-error`}
          className="mt-1 text-red-400 text-sm"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default AccessibleSelect;
