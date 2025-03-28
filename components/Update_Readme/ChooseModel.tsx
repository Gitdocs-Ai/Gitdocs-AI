import { AppContext, AppContextType } from "@/contexts/AppContext";
import { useContext } from "react";
import { RxArrowTopRight } from "react-icons/rx";
import { geminiModels } from "@/lib/geminiModels";
import { chatgptModels } from "@/lib/chatgptModels";
import { metaLlamaModels } from "@/lib/metaLlamaModels";
import { deepseekModels } from "@/lib/deepseekModels";
import { LuChevronRight } from "react-icons/lu";

interface Model {
    name: string;
    value: string;
    base_url: string;
}

const ChooseModel = ({ modelProviders }: { modelProviders: any[] }) => {
    const {
        setShowModel,
        selectedProvider,
        setSelectedProvider,
        selectedModel,
        setSelectedModel,
    } = useContext(AppContext) as AppContextType;

    const Models = () => {
        if (selectedProvider == "Gemini") {
            return geminiModels;
        } else if (selectedProvider == "ChatGPT") {
            return chatgptModels;
        } else if (selectedProvider == "Meta Llama") {
            return metaLlamaModels;
        } else if (selectedProvider == "DeepSeek") {
            return deepseekModels;
        } else {
            return geminiModels;
        }
    };

    const handleModelSelection = (model: Model) => {
        setSelectedModel(model);
        setShowModel(false);
    };

    return (
        <div
            className="fixed inset-0 z-20 bg-black bg-opacity-60 flex justify-center items-center"
            onClick={() => setShowModel(false)}
        >
            <div
                className="bg-[#141414] rounded-lg p-3 h-[27rem] w-[54rem] flex gap-3"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="grid grid-cols-2 gap-3 w-[68%] h-full flex-0">
                    {modelProviders.map((model) => (
                        <button
                            key={model.name}
                            className={`bg-[#181818] rounded-lg border text-start border-[#2A2A2A] flex flex-col px-7 justify-center gap-6 col-span-1 row-span-1 transition-all duration-150 ${model.isAvailable ? "cursor-pointer hover:border-[#4B4A4A] hover:bg-gradient-to-br hover:from-[#1A1A1A] hover:to-[#282828] group" : "cursor-not-allowed opacity-50"} ${model.name === selectedProvider ? "border-[#4B4A4A] bg-gradient-to-br from-[#1A1A1A] to-[#282828]" : ""}`}
                            onClick={() => setSelectedProvider(model.name)}
                            disabled={!model.isAvailable}
                        >
                            <div className="flex items-center w-fit justify-center">
                                {model.icon}
                            </div>
                            <div className="flex flex-col gap-2 -ms-1">
                                <h2 className="text-xl font-semibold mt-1">
                                    {model.name}
                                </h2>
                                <p className="text-sm text-gray-400 w-full -mt-1 flex items-center">
                                    <span className="max-w-[80%]">
                                        {model.description}
                                    </span>
                                    <RxArrowTopRight
                                        className="ml-auto group-hover:transform group-hover:rotate-45 transition-all duration-150"
                                        size={20}
                                    />
                                </p>
                            </div>
                            {!model.isAvailable && (
                                <p className="text-red-600 text-xs -my-4 -ms-1">
                                    Only available for Pro Users
                                </p>
                            )}
                        </button>
                    ))}
                </div>
                <div className="w-[32%] h-full flex flex-col py-4 gap-2 items-center bg-[#1A1A1A] rounded-lg">
                    <div className="flex items-center border cursor-pointer border-[#2A2A2A] rounded-full p-3 justify-center">
                        {
                            modelProviders.filter(
                                (model) => model.name === selectedProvider,
                            )[0].icon
                        }
                    </div>
                    <div className="flex flex-col gap-2 -ms-1">
                        <h2 className="text-xl font-semibold text-center mt-1">
                            {
                                modelProviders.filter(
                                    (model) => model.name === selectedProvider,
                                )[0].name
                            }
                        </h2>
                    </div>
                    <p className="text-blue-500 ps-3 w-fit flex items-center">
                        Choose a suitable model
                    </p>
                    <div className="flex flex-col gap-2 -ms-1 mt-3 overflow-y-auto mx-1 pe-3 px-4 py-1.5 w-full">
                        {Models().map((model) => (
                            <p
                                key={model.name}
                                className={`text-sm group text-gray-400 w-full my-0.5 hover:text-white cursor-pointer flex items-center p-3 rounded-lg bg-[#2A2A2A] ${model.name === selectedModel.name ? "bg-blue-500 text-white" : ""}`}
                                onClick={() => handleModelSelection(model)}
                            >
                                {model.name}
                                <LuChevronRight
                                    className="ml-auto group-hover:translate-x-1 transition-all duration-150"
                                    size={16}
                                />
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ChooseModel;
