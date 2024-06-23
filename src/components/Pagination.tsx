import { Button } from "@radix-ui/themes";
import React from "react";


interface IProps {
    currentPage: number,
    isLastPage: boolean,
    totalPages: number,
    onPageChange: (pageNumber: number) => void
}

const Pagination = ({ currentPage, isLastPage, totalPages, onPageChange }: IProps) => {


    const nextPage = () => {
        handlePageChange(currentPage + 1);
    };

    const prevPage = () => {
        handlePageChange(currentPage - 1);
    };

    const handlePageChange = (pageNumber: number) => {
        // Ensure that the new page number is within valid bounds
        if (pageNumber >= 1 && pageNumber !== currentPage) {
            onPageChange(pageNumber);
        }
    };


    return (
        <nav className="flex justify-center items-center">
            <ul className="flex">
                <li className="me-2">
                    <Button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        variant="solid"
                        className={` px-3 py-2 rounded-md   ${currentPage === 1 ? "bg-gray-300 hover:pointer-events-none" : "bg-primary text-white hover:bg-[#006f98] hover:transition-colors hover:ease-out"}`}
                    >
                        Prev
                    </Button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i).map((pageNumber) => (

                    <li
                        className="me-2 d-none d-xl-flex xl-justify-content-cente xl-align-items-center"
                        key={pageNumber + 1}
                    >
                        <Button
                            variant="solid"
                            className={`border-0 bg-transparent  font-normal ${pageNumber + 1 === currentPage ? "font-semibold text-townhall-black100 pointer-events-none rounded-lg px-3 py-2 bg-[#e3e3e4]" : "hover:hover:bg-gray-200 font-semibold text-townhall-black100 cursor-pointer rounded-lg px-3 py-2 bg-red-50 transition-colors hover:ease-out"
                                }`}
                            onClick={() => handlePageChange(pageNumber + 1)}
                            disabled={pageNumber + 1 === currentPage}
                        >
                            {pageNumber + 1}
                        </Button>
                    </li>

                ))}

                <li className="me-2">
                    <Button
                        onClick={nextPage}
                        disabled={isLastPage}
                        className={`px-3 py-2 rounded-md  ${!isLastPage ? "hover:hover:bg-[#006f98] transition-colors hover:ease-out text-white bg-primary" : "bg-gray-300 "}`}
                    >
                        Next
                    </Button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
