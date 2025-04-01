"use client";

import { X, AlertCircle } from "lucide-react";
import { countries } from "countries-list";
import Image from "next/image";
import { useState } from "react";

const AddAddressForm = ({
  addressData,
  setAddressData,
  setShowAddAddressForm,
  handleAddAddress,
  handleUpdateAddress,
  isEditing,
  setIsEditing,
  savedBillingAddresses,
}: {
  addressData: any;
  setAddressData: (address: any) => void;
  setShowAddAddressForm: (show: boolean) => void;
  handleAddAddress: () => void;
  handleUpdateAddress: () => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  savedBillingAddresses: any;
}) => {
  const [showCountryList, setShowCountryList] = useState(false);
  const [country, setCountry] = useState(
    addressData?.country || "United States",
  );
  const [error, setError] = useState("");

  const handleClose = () => {
    if (showCountryList) {
      setShowCountryList(false);
    } else {
      setShowAddAddressForm(false);
    }
  };

  const countriesWithFlags = Object.entries(countries)
    .map(([key, country]) => ({
      name: country.name || "Unknown", // Fallback for missing name
      flag: key
        ? `https://flagcdn.com/${key.toLowerCase()}.svg`
        : "https://via.placeholder.com/150",
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const data = countriesWithFlags.map((country) => (
    <div
      onClick={() => {
        setCountry(country.name);
        setAddressData({ ...addressData, country: country.name });
      }}
      className="flex items-center gap-4 appearance-none bg-[#343333] text-white py-2 px-4 hover:bg-[#474646] cursor-pointer"
      key={country.name}
    >
      <Image
        src={country.flag}
        alt={country.name}
        width={25}
        height={25}
        className="rounded-[2.5px]"
      />
      <p>{country.name}</p>
    </div>
  ));

  const defaultCountry = countriesWithFlags.find(
    (AllCountry) => AllCountry.name === (country || "United States"),
  );

  const handleSave = (e: any) => {
    e.preventDefault();

    if (addressData?.name === "") {
      setError("Name is required");
      return;
    }
    if (addressData?.contact === "") {
      setError("Contact is required");
      return;
    }
    if (addressData?.address1 === "") {
      setError("Address is required");
      return;
    }
    if (addressData?.city === "") {
      setError("City is required");
      return;
    }
    if (addressData?.state === "") {
      setError("State is required");
      return;
    }
    if (addressData?.zip === "") {
      setError("Zip code is required");
      return;
    }
    if (addressData?.country === "") {
      setError("Country is required");
      return;
    }

    setError("");

    if (isEditing) {
      handleUpdateAddress();
      setIsEditing(false);
    } else {
      const exists = savedBillingAddresses.some(
        (address: any) =>
          address.name === addressData?.name &&
          address.contact === addressData?.contact,
      );
      if (exists) {
        setError("Two addresses cannot have the same name and contact");
        return;
      }
      setError("");
      handleAddAddress();
    }
    setShowAddAddressForm(false);
  };

  return (
    <div
      onClick={handleClose}
      className="absolute z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1f1f1f] p-4 w-[32rem] h-[37rem] overflow-y-auto rounded-xl"
      >
        <div className="flex justify-between">
          <h2 className="text-lg">
            {isEditing ? "Edit address" : "Add a new billing address"}
          </h2>
          <button onClick={handleClose} className="text-sm text-gray-500">
            <X />
          </button>
        </div>

        <form onClick={() => setShowCountryList(false)} className="mt-5">
          <p className="text-[#999] border-b-2 border-[#353535] pb-1 text-sm">
            Personal information
          </p>

          <div className="flex flex-col gap-2 mt-3">
            <label htmlFor="name" className="text-sm font-semibold">
              Name
            </label>
            <input
              onChange={(e) =>
                setAddressData({
                  ...addressData,
                  name: e.target.value,
                })
              }
              type="text"
              id="name"
              name="name"
              disabled={isEditing}
              value={addressData?.name}
              placeholder="John Doe"
              className={`w-full text-sm py-1.5 px-4 bg-transparent rounded-md border border-[#353535] ${isEditing ? "cursor-not-allowed" : ""}`}
            />

            <label htmlFor="contact" className="text-sm font-semibold">
              Contact
            </label>
            <input
              onChange={(e) =>
                setAddressData({
                  ...addressData,
                  contact: e.target.value,
                })
              }
              type="text"
              id="contact"
              name="contact"
              disabled={isEditing}
              value={addressData?.contact}
              placeholder="abc@gmail.com"
              className={`w-full text-sm py-1.5 px-4 bg-transparent rounded-md border border-[#353535] ${isEditing ? "cursor-not-allowed" : ""}`}
            />
          </div>

          <p className="text-[#999] border-b-2 border-[#353535] pb-1 mt-8 text-sm">
            Billing address
          </p>

          <div className="flex flex-col gap-2 mt-3">
            <p className="text-sm font-semibold">Country</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowCountryList(!showCountryList);
              }}
              type="button"
              className="w-full text-start max-h-[10rem] relative cursor-pointer text-sm py-2 px-4 bg-transparent rounded-md border border-[#353535] focus:outline-2"
            >
              <div className="flex items-center gap-4 text-white">
                <Image
                  src={defaultCountry?.flag || ""}
                  alt={defaultCountry?.name || ""}
                  width={25}
                  height={25}
                  className="rounded-[2.5px]"
                />
                <p>{defaultCountry?.name}</p>
              </div>

              {showCountryList && (
                <div className="w-full absolute top-10 left-0 max-h-60 overflow-y-auto cursor-pointer text-sm bg-transparent rounded-md border border-[#353535]">
                  {data}
                </div>
              )}
            </button>

            <label htmlFor="address-1" className="text-sm font-semibold">
              Address line 1
            </label>
            <input
              onChange={(e) =>
                setAddressData({
                  ...addressData,
                  address1: e.target.value,
                })
              }
              type="text"
              id="address-1"
              name="address-1"
              value={addressData?.address1}
              placeholder="123 Main St"
              className="w-full text-sm py-1.5 px-4 bg-transparent rounded-md border border-[#353535]"
            />

            <label
              htmlFor="address-2 (optional)"
              className="text-sm font-semibold"
            >
              Address line 2 (optional)
            </label>
            <input
              onChange={(e) =>
                setAddressData({
                  ...addressData,
                  address2: e.target.value,
                })
              }
              type="text"
              id="address-2"
              name="address-2"
              value={addressData?.address2}
              placeholder="Apt 1"
              className="w-full text-sm py-1.5 px-4 bg-transparent rounded-md border border-[#353535]"
            />

            <div className="flex gap-4 justify-between">
              <div className="flex flex-col gap-2">
                <label htmlFor="city" className="text-sm font-semibold">
                  City
                </label>
                <input
                  onChange={(e) =>
                    setAddressData({
                      ...addressData,
                      city: e.target.value,
                    })
                  }
                  type="text"
                  id="city"
                  name="city"
                  value={addressData?.city}
                  placeholder="New York"
                  className="w-full text-sm py-1.5 px-4 bg-transparent rounded-md border border-[#353535]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="state" className="text-sm font-semibold">
                  State
                </label>
                <input
                  onChange={(e) =>
                    setAddressData({
                      ...addressData,
                      state: e.target.value,
                    })
                  }
                  type="text"
                  id="state"
                  name="state"
                  value={addressData?.state}
                  placeholder="NY"
                  className="w-full text-sm py-1.5 px-4 bg-transparent rounded-md border border-[#353535]"
                />
              </div>
            </div>

            <label htmlFor="postal-code" className="text-sm font-semibold">
              Zip code
            </label>
            <input
              onChange={(e) =>
                setAddressData({
                  ...addressData,
                  zip: e.target.value,
                })
              }
              type="text"
              id="postal-code"
              name="postal-code"
              value={addressData?.zip ? addressData?.zip : ""}
              placeholder="12345"
              className="w-full text-sm py-1.5 px-4 bg-transparent rounded-md border border-[#353535]"
            />

            <div className="flex gap-4 justify-between">
              <div className="flex flex-col gap-2">
                <label htmlFor="taxid-type" className="text-sm font-semibold">
                  Tax ID Type (optional)
                </label>
                <input
                  onChange={(e) =>
                    setAddressData({
                      ...addressData,
                      taxIdType: e.target.value,
                    })
                  }
                  type="text"
                  id="taxid-type"
                  name="taxid-type"
                  value={addressData?.taxIdType}
                  className="w-full text-sm py-1.5 px-4 bg-transparent rounded-md border border-[#353535]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="tax-number" className="text-sm font-semibold">
                  Tax Number (optional)
                </label>
                <input
                  onChange={(e) =>
                    setAddressData({
                      ...addressData,
                      taxId: e.target.value,
                    })
                  }
                  type="text"
                  id="tax-number"
                  name="tax-number"
                  value={addressData?.taxId}
                  placeholder="1234567890"
                  className="w-full text-sm py-1.5 px-4 bg-transparent rounded-md border border-[#353535]"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-3 items-center">
              {error && (
                <p className="text-[#f55757] flex items-center gap-3 ms-3">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
                </p>
              )}
              <button
                onClick={handleClose}
                type="button"
                className="text-sm py-2 px-4 ms-auto rounded-lg border border-[#353535] text-[#ededed]"
              >
                Cancel
              </button>
              <button
                onClick={(e) => handleSave(e)}
                type="button"
                className="text-sm py-2 px-4 rounded-lg bg-[#ededed] text-black"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddAddressForm;
