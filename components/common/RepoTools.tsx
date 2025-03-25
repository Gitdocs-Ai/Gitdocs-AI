'use client'

import { TfiWrite } from "react-icons/tfi";
import { useState, useContext } from "react";
import LoadingAnimation from "./LoadingAnimation";
import { AppContext, AppContextType } from "@/contexts/AppContext";
import { MultiStepLoader } from "./MultiStepLoader";

const RepoTools = ({ doc_name, doc_score }: { doc_name: string, doc_score: number }) => {

    const { gridView, stopAllActions, setStopAllActions } = useContext(AppContext) as AppContextType;

    const [loading, setLoading] = useState(false)

    const handleUpdateReadme = () => {
        setStopAllActions(true);
        if (doc_name) {
            setLoading(true)
        } else {
            console.error("doc_name is undefined or empty");
        }
    }

    const docScoreColor = () => {

        if (doc_score === 100) {
            return "text-[#0686DF]"
        } else if (doc_score > 80 && doc_score < 100) {
            return "text-[#209C4D]"
        } else if (doc_score > 60 && doc_score <= 80) {
            return "text-[#F8C75D]"
        }else if (doc_score > 0 && doc_score <= 50) {
            return "text-[#EF4444]"
        } else {
            return "text-[#383737]"
        }
    }

    return (
        <>
        {loading && <MultiStepLoader loading={loading} setLoading={setLoading} setStopAllActions={setStopAllActions} doc_name={doc_name} />}
        <div className={`flex ${gridView ? 'mt-3 justify-between items-center' : '-mt-1 mb-1 flex-col-reverse w-full'}`}>
            <div className="flex items-center">

            <button className={`text-sm border-[#383737] flex gap-2 items-center hover:bg-[#1f1f1f] ${gridView ? 'px-3 py-2.5 -ms-1' : 'border px-2 py-[7px] mt-2'} ${stopAllActions ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => {
                handleUpdateReadme()
            }} disabled={stopAllActions}>
                
            {loading 
                ? 
                <>
                    <LoadingAnimation /> 
                    <span className="text-xs">Updating...</span>
                </>
                : 
                <>
                    <TfiWrite size={16} />
                    <span className="text-xs">Update Readme</span>
                </>

            }

            </button>

            </div>
            <p className="text-sm text-gray-500">

                Doc Score: <span className={docScoreColor()}>{doc_score}</span>

            </p>
        </div>
    </>
    )
}

export default RepoTools