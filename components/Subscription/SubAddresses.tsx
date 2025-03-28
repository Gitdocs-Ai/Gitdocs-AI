"use client";

import { useEffect, useState } from "react";
import AddAddressForm from "./AddAddressForm";
import { Star, Mail, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
interface AddressData {
    name: string;
    contact: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: number;
    country: string;
    taxId: string;
    taxIdType: string;
    isPrimary: boolean;
}

const SubAddresses = () => {
    const { user } = useUser();

    const [showAddAddressForm, setShowAddAddressForm] = useState(false);
    const [addressData, setAddressData] = useState<AddressData>({
        name: "",
        contact: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: 0,
        country: "United States",
        taxId: "",
        taxIdType: "",
        isPrimary: false,
    });
    const [savedBillingAddresses, setSavedBillingAddresses] = useState<
        AddressData[]
    >([]);
    const [isEditing, setIsEditing] = useState(false);
    const [refetchTrigger, setRefetchTrigger] = useState(0);

    useEffect(() => {
        const fetchBillingAddress = async () => {
            const response = await axios.patch(
                "/api/fetch/subscriptiondata?query=billingAddress",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${user?.id}`,
                    },
                },
            );
            if (response.data.data) {
                setSavedBillingAddresses(response.data.data.billingAddress);
            } else {
                setSavedBillingAddresses([]);
            }
        };
        fetchBillingAddress();
    }, [user, refetchTrigger]);

    const handleAddBillingAddress = () => {
        setIsEditing(false);
        setAddressData({
            name: "",
            contact: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zip: 0,
            country: "United States",
            taxId: "",
            taxIdType: "",
            isPrimary: false,
        });
        setShowAddAddressForm(true);
    };

    const handleEditAddress = (address: any) => {
        setAddressData(address);
        setIsEditing(true);
        setShowAddAddressForm(true);
    };

    const finalAddAddress = () => {
        return new Promise((resolve) => {
            setAddressData((prev) => {
                const updatedData = {
                    ...prev,
                    isPrimary: savedBillingAddresses.length === 0,
                };
                resolve(updatedData);
                return updatedData;
            });
        });
    };

    const handleAddAddress = async () => {
        const updatedAddressData = await finalAddAddress();

        if (savedBillingAddresses.length > 0) {
            setSavedBillingAddresses([
                ...savedBillingAddresses,
                updatedAddressData as AddressData,
            ]);
        } else {
            setSavedBillingAddresses([updatedAddressData as AddressData]);
        }

        await axios.post(
            "/api/fetch/subscriptiondata?query=addBillingAddress",
            { addressData: updatedAddressData },
            {
                headers: {
                    Authorization: `Bearer ${user?.id}`,
                },
            },
        );
    };

    const handleUpdateAddress = async () => {
        setSavedBillingAddresses((prevAddresses) => {
            const updatedAddresses = prevAddresses.map((addr) =>
                addr.name === addressData.name &&
                addr.contact === addressData.contact
                    ? { ...addr, ...addressData } // Update the existing address
                    : addr,
            );

            // If no matching address is found, add the new one
            const isExisting = updatedAddresses.some(
                (addr) =>
                    addr.name === addressData.name &&
                    addr.contact === addressData.contact,
            );

            return isExisting
                ? updatedAddresses
                : [...updatedAddresses, addressData];
        });

        await axios.post(
            "/api/fetch/subscriptiondata?query=updateBillingAddress",
            {
                addressData: addressData,
            },
            {
                headers: {
                    Authorization: `Bearer ${user?.id}`,
                },
            },
        );
    };

    const handleDeleteAddress = async (address: any) => {
        try {
            await axios.delete(
                "/api/fetch/subscriptiondata?query=deleteBillingAddress",
                {
                    data: { addressData: address },
                    headers: {
                        Authorization: `Bearer ${user?.id}`,
                    },
                },
            );
            setRefetchTrigger((prev) => prev + 1);
        } catch (error) {
            console.error("Error deleting address:", error);
        }
    };

    return (
        <>
            {showAddAddressForm && (
                <AddAddressForm
                    handleAddAddress={handleAddAddress}
                    handleUpdateAddress={handleUpdateAddress}
                    addressData={addressData}
                    setAddressData={setAddressData}
                    setShowAddAddressForm={setShowAddAddressForm}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    savedBillingAddresses={savedBillingAddresses}
                />
            )}
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h1 className="text-xl font-semibold mt-2">
                        Billing Address
                    </h1>
                    <p className="text-sm mt-1 text-[#999]">
                        Manage your billing and shipping address.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => handleAddBillingAddress()}
                        variant="outline"
                        className="text-[#000000]"
                    >
                        <Plus className="w-4 h-4" />
                        Add Address
                    </Button>
                </div>
            </div>

            <div className="w-full mt-5 gap-4 grid grid-cols-3 ">
                {savedBillingAddresses?.length === 0 && (
                    <div
                        onClick={() => handleAddBillingAddress()}
                        className="p-6 bg-[#1A1A1A] rounded-lg text-[#999] h-52 cursor-pointer border-2 border-dashed border-[#4c4b4b] font-semibold flex items-center justify-center"
                    >
                        Add a billing address to get started
                    </div>
                )}
                {savedBillingAddresses.map((address: any) => (
                    <div
                        key={address.name}
                        className={`p-4 relative bg-[#1A1A1A] rounded-lg h-60 col-span-1 border cursor-pointer ${address.isPrimary ? "border-[#3B82F6]" : "border-[#262626] hover:border-[#414141]"}`}
                    >
                        {address.isPrimary && (
                            <div className="absolute text-sm top-0 right-0 flex items-center gap-2 bg-[#3B82F6] rounded-bl-lg rounded-tr-lg px-2 py-1 text-[#ededed]">
                                <Star className="w-3 h-3" />
                                <span>Primary</span>
                            </div>
                        )}
                        <h2 className="text-lg font-semibold mb-1">
                            {address.name}
                        </h2>
                        <div className="flex items-center gap-2 text-[#999]">
                            <Mail className="w-4 h-4" />
                            <p className="text-sm">{address.contact}</p>
                        </div>
                        <div className="flex items-start gap-3 mt-4 bg-[#262626] rounded-lg py-2 px-3">
                            <MapPin className="w-5 h-5" />
                            <div>
                                <p>
                                    {address.address1}, {address.address2}
                                </p>
                                <p>
                                    {address.city}, {address.state}{" "}
                                    {address.zip}
                                </p>
                                <p className="text-[#999]">{address.country}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                            <Button
                                onClick={() => handleEditAddress(address)}
                                variant="outline"
                                size="sm"
                                className="text-[#000000] bg-[#ededed] hover:bg-[#ededed]/80 ms-auto"
                            >
                                Edit
                            </Button>
                            <Button
                                onClick={() => handleDeleteAddress(address)}
                                disabled={savedBillingAddresses.length === 1}
                                variant="outline"
                                size="sm"
                                className="text-[#ededed] bg-[#dc5353] hover:bg-[#dc5353]/80 hover:text-[#ededed] border-none"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
export default SubAddresses;
