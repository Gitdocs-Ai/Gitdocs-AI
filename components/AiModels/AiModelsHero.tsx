"use client";

import { Button } from "@/components/ui/button";
import AnimatedCards from "./AnimatedCards";
import { Info } from "lucide-react";
import { AppContext, AppContextType } from "@/contexts/AppContext";
import { useContext } from "react";
import { chatgptModels } from "@/lib/chatgptModels";
import { geminiModels } from "@/lib/geminiModels";
import { metaLlamaModels } from "@/lib/metaLlamaModels";
import { deepseekModels } from "@/lib/deepseekModels";

const AiModelsHero = () => {
  const { storedUser } = useContext(AppContext) as AppContextType;

  const modelProviders = [
    {
      name: "Gemini",
      identifier: "gemini",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={38}
          height={38}
          color={"#FFFFFF"}
          fill={"none"}
        >
          <path
            d="M3 12C7.97056 12 12 7.97056 12 3C12 7.97056 16.0294 12 21 12C16.0294 12 12 16.0294 12 21C12 16.0294 7.97056 12 3 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ),
      description: "Best for small and personal projects",
      isAvailable: true,
    },
    {
      name: "ChatGPT",
      identifier: "chatgpt",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={38}
          height={38}
          color={"#FFFFFF"}
          fill={"none"}
        >
          <path
            d="M11.7453 14.85L6.90436 12V7C6.90436 4.79086 8.72949 3 10.9809 3C12.3782 3 13.6113 3.6898 14.3458 4.74128"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.59961 19.1791C10.3266 20.2757 11.5866 21.0008 13.0192 21.0008C15.2707 21.0008 17.0958 19.21 17.0958 17.0008V12.0008L12.1612 9.0957"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.45166 13.5L9.45123 7.66938L13.8642 5.16938C15.814 4.06481 18.3072 4.72031 19.4329 6.63348C20.1593 7.86806 20.1388 9.32466 19.5089 10.4995"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.48963 13.4993C3.8595 14.6742 3.83887 16.131 4.56539 17.3657C5.6911 19.2789 8.18428 19.9344 10.1341 18.8298L14.5471 16.3298L14.643 10.7344"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.0959 17.6309C18.4415 17.5734 19.7295 16.8634 20.4529 15.634C21.5786 13.7209 20.9106 11.2745 18.9608 10.1699L14.5478 7.66992L9.48907 10.4255"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.90454 6.36938C5.55865 6.42662 4.27032 7.13672 3.54684 8.3663C2.42113 10.2795 3.08917 12.7258 5.03896 13.8304L9.45196 16.3304L14.5 13.5807"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      description: "Best for small to medium projects",
      isAvailable:
        storedUser?.subscriptionType === "Pro" ||
        storedUser?.subscriptionType === "Enterprise",
    },
    {
      name: "Meta Llama",
      identifier: "metaLlama",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={38}
          height={38}
          viewBox="0 0 256 256"
        >
          <g
            fill="#ffffff"
            fillRule="nonzero"
            stroke="none"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
            strokeDasharray=""
            strokeDashoffset="0"
            fontFamily="none"
            fontWeight="none"
            fontSize="none"
            textAnchor="none"
          >
            <g transform="scale(5.12,5.12)">
              <path d="M47.3,21.01c-0.58,-1.6 -1.3,-3.16 -2.24,-4.66c-0.93,-1.49 -2.11,-2.93 -3.63,-4.13c-1.51,-1.19 -3.49,-2.09 -5.59,-2.26l-0.78,-0.04c-0.27,0.01 -0.57,0.01 -0.85,0.04c-0.57,0.06 -1.11,0.19 -1.62,0.34c-1.03,0.32 -1.93,0.8 -2.72,1.32c-1.42,0.94 -2.55,2.03 -3.57,3.15c0.01,0.02 0.03,0.03 0.04,0.05l0.22,0.28c0.51,0.67 1.62,2.21 2.61,3.87c1.23,-1.2 2.83,-2.65 3.49,-3.07c0.5,-0.31 0.99,-0.55 1.43,-0.68c0.23,-0.06 0.44,-0.11 0.64,-0.12c0.1,-0.02 0.19,-0.01 0.3,-0.02l0.38,0.02c0.98,0.09 1.94,0.49 2.85,1.19c1.81,1.44 3.24,3.89 4.17,6.48c0.95,2.6 1.49,5.44 1.52,8.18c0,1.31 -0.17,2.57 -0.57,3.61c-0.39,1.05 -1.38,1.45 -2.5,1.45c-1.63,0 -2.81,-0.7 -3.76,-1.68c-1.04,-1.09 -2.02,-2.31 -2.96,-3.61c-0.78,-1.09 -1.54,-2.22 -2.26,-3.37c-1.27,-2.06 -2.97,-4.67 -4.15,-6.85l-2.75,-4.15c-0.31,-0.39 -0.61,-0.78 -0.94,-1.17c-1.11,-1.26 -2.34,-2.5 -3.93,-3.56c-0.79,-0.52 -1.69,-1 -2.72,-1.32c-0.51,-0.15 -1.05,-0.28 -1.62,-0.34c-0.18,-0.02 -0.36,-0.03 -0.54,-0.03c-0.11,0 -0.21,-0.01 -0.31,-0.01l-0.78,0.04c-2.1,0.17 -4.08,1.07 -5.59,2.26c-1.52,1.2 -2.7,2.64 -3.63,4.13c-0.94,1.5 -1.66,3.06 -2.24,4.66c-1.13,3.2 -1.74,6.51 -1.75,9.93c0.01,1.78 0.24,3.63 0.96,5.47c0.7,1.8 2.02,3.71 4.12,4.77c1.03,0.53 2.2,0.81 3.32,0.81c1.23,0.03 2.4,-0.32 3.33,-0.77c1.87,-0.93 3.16,-2.16 4.33,-3.4c2.31,-2.51 4.02,-5.23 5.6,-8c0.44,-0.76 0.86,-1.54 1.27,-2.33c-0.21,-0.41 -0.42,-0.84 -0.64,-1.29c-0.62,-1.03 -1.39,-2.25 -1.95,-3.1c-0.83,1.5 -1.69,2.96 -2.58,4.41c-1.59,2.52 -3.3,4.97 -5.21,6.98c-0.95,0.98 -2,1.84 -2.92,2.25c-0.47,0.2 -0.83,0.27 -1.14,0.25c-0.43,0 -0.79,-0.1 -1.13,-0.28c-0.67,-0.35 -1.3,-1.1 -1.69,-2.15c-0.4,-1.04 -0.57,-2.3 -0.57,-3.61c0.03,-2.74 0.57,-5.58 1.52,-8.18c0.93,-2.59 2.36,-5.04 4.17,-6.48c0.91,-0.7 1.87,-1.1 2.85,-1.19l0.38,-0.02c0.11,0.01 0.2,0 0.3,0.02c0.2,0.01 0.41,0.06 0.64,0.12c0.26,0.08 0.54,0.19 0.83,0.34c0.2,0.1 0.4,0.21 0.6,0.34c1,0.64 1.99,1.58 2.92,2.62c0.72,0.81 1.41,1.71 2.1,2.63l2.64,4.09c0.75,1.55 1.53,3.09 2.39,4.58c1.58,2.77 3.29,5.49 5.6,8c0.68,0.73 1.41,1.45 2.27,2.1c0.61,0.48 1.28,0.91 2.06,1.3c0.93,0.45 2.1,0.8 3.33,0.77c1.12,0 2.29,-0.28 3.32,-0.81c2.1,-1.06 3.42,-2.97 4.12,-4.77c0.72,-1.84 0.95,-3.69 0.96,-5.47c-0.01,-3.42 -0.62,-6.73 -1.75,-9.93z"></path>
            </g>
          </g>
        </svg>
      ),
      description: "Best for small to medium projects",
      isAvailable:
        storedUser?.subscriptionType === "Pro" ||
        storedUser?.subscriptionType === "Enterprise",
    },
    {
      name: "DeepSeek",
      identifier: "deepseek",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={38}
          height={38}
          color={"#FFFFFF"}
          fill={"none"}
        >
          <path
            d="M20.7251 6.16595C19.5974 6.16595 18.9538 6.95202 18.9538 6.95202C18.7384 5.92858 18.095 5.6278 17.3608 5.28691C16.8965 5.07135 16.702 4.59085 16.6387 4.2437C16.6146 4.11149 16.5055 4.00308 16.3711 4.00308C16.237 4.00308 16.1093 4.05921 16.0445 4.17662C15.9059 4.42748 15.6911 4.97621 15.672 5.98711C15.6435 7.48962 16.8825 8.64855 17.5056 9.04019C17.4415 9.41048 17.216 9.98242 17.1112 10.2221C16.7962 10.1096 15.9376 9.74732 15.2402 8.98763C14.2834 7.94536 13.5027 7.20684 12.4854 6.4845C11.4681 5.76216 12.1483 4.90154 12.5757 4.69688C13.003 4.49221 12.678 4.28196 11.6125 4.31808C10.7602 4.34697 9.54607 4.84808 9.04556 5.09502C8.53523 4.93292 7.47442 4.90065 7.00781 4.90478C2.42529 4.90478 1.0006 8.98014 1.0006 11.0006C1.0006 17.0868 5.87378 20.0006 9.37378 20.0006C13.3324 20.0006 14.7193 18.3865 14.7193 18.3865C14.8826 18.4882 15.4787 18.7032 16.5574 18.749C17.9058 18.8062 18.4082 18.4246 18.4464 18.1321C18.4845 17.8395 18.2683 17.7314 18.0775 17.6423C17.8867 17.5533 17.5878 17.3816 17.0217 17.1971C16.5689 17.0496 16.3652 16.889 16.3199 16.8272C19.0501 14.3553 19.5503 10.8921 19.473 9.4203C21.5848 9.33823 22.4164 7.93216 22.69 7.22092C22.9696 6.49381 23.1441 5.50412 22.8541 5.27981C22.6221 5.10036 22.4281 5.31649 22.3601 5.44699C21.9885 5.84344 21.7159 6.16595 20.7251 6.16595Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.9998 10.5684C11.9998 10.5684 12.8758 10.2982 13.6446 10.823C14.6861 11.5338 14.9998 12.4988 14.9998 12.4988"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.5 16.4987C13.5 16.4987 12.4587 15.9918 10.8957 13.9604C9.01764 11.5195 7.24874 8.88553 3.52946 9.7468C3.52946 9.7468 3.50016 14.9979 8.50002 16.4987"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      description: "Best for small to medium projects",
      isAvailable:
        storedUser?.subscriptionType === "Pro" ||
        storedUser?.subscriptionType === "Enterprise",
    },
  ];

  const models = [geminiModels, chatgptModels, metaLlamaModels, deepseekModels];

  return (
    <div className="mx-auto py-6 px-10 w-full min-h-[calc(100vh-64px)]">
      <h2 className="text-3xl font-bold text-white">Models</h2>
      <p className="text-sm mt-2 -mb-1 text-[#999]">
        Explore the list of Generative AI models currently supported, along with
        upcoming additions. Stay updated on new releases and request support for
        models you’d like to see added. Help shape the future of AI by letting
        us know what matters most to you!
      </p>
      {modelProviders.map((model, index) => (
        <div key={model.name}>
          <h3 className="text-2xl ms-4 flex item-center gap-2 mt-10 mb-3 text-white">
            {model.icon}{" "}
            <span className="text-white mt-1">
              {model.name}{" "}
              <span className="text-gray-500 text-sm">
                ({model.description})
              </span>{" "}
              {model.isAvailable ? (
                <span className="text-green-500 text-sm">Available</span>
              ) : (
                <span className="text-red-500 text-sm">
                  Only for Pro/Enterprise
                </span>
              )}
            </span>
          </h3>
          <AnimatedCards cards={models[index]} />
        </div>
      ))}

      <div className="bg-gradient-to-r mx-4 from-[#7F58E4]/20 to-[#1496D8]/20 rounded-lg p-6 mt-14 mb-4 border border-white/10">
        <div className="flex items-start gap-4">
          <Info size={24} className="text-[#1496D8] mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Request a new model?
            </h3>
            <p className="text-grayText mb-4">
              Do you have a specific model you'd like to see on our platform?
              Let us know your suggestion, and we'll consider adding it to
              enhance your experience and meet your needs.
            </p>
            <Button
              disabled
              className="bg-gradient-to-r from-[#7F58E4] to-[#1496D8] hover:opacity-90"
            >
              Request Model
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiModelsHero;
