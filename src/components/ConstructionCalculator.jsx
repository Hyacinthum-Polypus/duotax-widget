import { useState } from 'react'

export default function ConstructionCalculator() {
    const startYear = 2026;
    const endYear = 1988;
    const totalYears = startYear - endYear + 1;
    const years = Array.from({ length: totalYears }, (_, index) => startYear - index);

    const investmentPropertyTypes = ["House", "Granny Flat", "Townhouse", "Apartment", "Office", "Warehouse"];
    const states = ["Victoria", "Queensland", "New South Wales", "South Australia", "Western Australia", "Tasmania", "Northern Territory"];
    const buildTypes = ["New build", "Knock-down & rebuild", "Renovation - light (<30% area)", "renovation - major (>30% area)", "Extension / addition", "Granny flat / secondary dwelling"];
    const specFinishLevels = ["Economy", "Standard", "Premium", "Luxury"];
    const wallTypes = ["Brick veneer", "Double brick", "Reinforced concrete"];


    const [selectedYear, setYear] = useState("");
    const [selectedInvestmentPropertyType, setInvestmentPropertyType] = useState("");
    const [selectedInvestmentPropertyState, setInvestmentPropertyState] = useState("");
    const [selectedBuildType, setBuildType] = useState("");
    const [selectedSpecFinishLevel, setSpecFinishLevel] = useState("");
    const [floorArea, setFloorArea] = useState(0);
    const [numberOfFloors, setNumberOfFloors] = useState(0);
    const [selectedWallType, setWallType] = useState("");
    const [numberOfBedrooms, setNumberOfBedrooms] = useState(0);
    const [isElevator, setIsElevator] = useState("no");
    const [isMezzaine, setIsMezzaine] = useState("no");
    const [isBasement, setIsBasement] = useState("no");
    const [isDuctAirConditioning, setIsDuctAirConditioning] = useState("no");


    return (
        <div className="mx-20 flex flex-col  mt-4">
            <h1 className="text-2xl font-bold">Construction Cost Calculator</h1>
            <div className="border-b-1">
                <p>Knowing the costs of building a property in Australia is essential for budget control and monitoring.</p>
                <p>To estimate how much it will cost to build a house, use our construction cost calculator. Every house is different in size, floor area, and finish.</p>
            </div>
            <div className="flex flex-row">
                <div className="flex-1 flex flex-col">  
                    <label htmlFor="cc-constructionYear" className="block mt-4"><span>What year was construction completed?</span></label>
                    <select className="border-1 mt-4 px-4 py-2" 
                            name="cc-constructionYear" 
                            id="cc-constructionYear" 
                            aria-required="true" 
                            required 
                            value={selectedYear}
                            onChange={e => setYear(e.target.value)}
                    >
                        <option value="" disabled hidden>Select...</option>
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                        <option value="sep 1987">Sep 1987</option>
                        <option value="before sep 1987">{'<'}Sep 1987</option>
                    </select>

                    <label htmlFOr="cc-investmentPropertyState" className="block mt-4"><span>What is the state of the property?</span></label>
                    <select className="border-1 mt-4 px-4 py-2" 
                            name="cc-investmentPropertyState"
                            id="cc-investmentPropertyState"
                            aria-required="true"
                            required
                            value={selectedInvestmentPropertyState}
                            onChange={e => setInvestmentPropertyState(e.target.value)}
                    >
                        <option value="" disabled hidden>Select...</option>
                        {states.map(i => (
                            <option key={i} value={i}>{i}</option>
                        ))}
                    </select>

                    <label htmlFOr="cc-buildType" className="block mt-4"><span>What is the build type?</span></label>
                    <select className="border-1 mt-4 px-4 py-2" 
                            name="cc-buildType"
                            id="cc-buildType"
                            aria-required="true"
                            required
                            value={selectedBuildType}
                            onChange={e => setBuildType(e.target.value)}
                    >
                        <option value="" disabled hidden>Select...</option>
                        {buildTypes.map(i => (
                            <option key={i} value={i}>{i}</option>
                        ))}
                    </select>

                    <label htmlFOr="cc-spec" className="block mt-4"><span>What is the spec / finish level?</span></label>
                    <select className="border-1 mt-4 px-4 py-2" 
                            name="cc-spec"
                            id="cc-spec"
                            aria-required="true"
                            required
                            value={selectedSpecFinishLevel}
                            onChange={e => setSpecFinishLevel(e.target.value)}
                    >
                        <option value="" disabled hidden>Select...</option>
                        {buildTypes.map(i => (
                            <option key={i} value={i}>{i}</option>
                        ))}
                    </select>

                    <label htmlFOr="cc-floorArea" className="block mt-4"><span>What is the floor area?</span></label>
                    <div className="mt-4 flex" >
                        <input type="number" className="flex-1 border-1 px-4 py-2" name="cc-floorArea" id="cc-floorArea" value={floorArea} onChange={e => setFloorArea(e.target.value)} required />
                        <span className="bg-gray-100 p-2 border-y-1 border-e-1 flex-none">m<sup>2</sup></span>
                    </div>

                    <label htmlFOr="cc-numberOfFloors" className="block mt-4"><span>What is the number of floors?</span></label>
                    <input type="number" className="mt-4 border-1 px-4 py-2"  name="cc-numberOfFloors" id="cc-numberOfFloors" value={numberOfFloors} onChange={e => setNumberOfFloors(e.target.value)} required />     
                        
                    <div className="mt-4">
                        <span className="block">Does the property have duct air-conditioning?</span>
                        <div className="flex gap-4 mt-2">
                            <label className="inline-flex items">
                                <input type="radio" name="cc-airConditoning" value="yes" className="form-radio" checked={isDuctAirConditioning == "yes"} onChange={e => setIsDuctAirConditioning(e.target.value)} />
                                <span className='ml-2'>Yes</span>
                            </label>
                            <label className="inline-flex items">
                                <input type="radio" name="cc-airConditioning" value="no" className="form-radio" checked={isDuctAirConditioning == "no"} onChange={e => setIsDuctAirConditioning(e.target.value)} />
                                <span className='ml-2'>No</span>
                            </label>
                        </div>
                    </div>

                    <label htmlFOr="cc-investmentPropertyType" className="block mt-4"><span>What is the investment property type?</span></label>
                    <select className="border-1 mt-4 px-4 py-2" 
                            name="cc-investmentPropertyType"
                            id="cc-investmentPropertyType"
                            aria-required="true"
                            required
                            value={selectedInvestmentPropertyType}
                            onChange={e => setInvestmentPropertyType(e.target.value)}
                    >
                        <option value="" disabled hidden>Select...</option>
                        {investmentPropertyTypes.map(i => (
                            <option key={i} value={i}>{i}</option>
                        ))}
                    </select>

                    {(selectedInvestmentPropertyType == "House" || selectedInvestmentPropertyType == "Granny Flat" || selectedInvestmentPropertyType == "Townhouse") &&
                        <>
                            <label htmlFOr="cc-wallType" className="block mt-4"><span>What is the construction wall type?</span></label>
                            <select className="border-1 mt-4 px-4 py-2" 
                                    name="cc-wallType"
                                    id="cc-wallType"
                                    aria-required="true"
                                    required
                                    value={selectedWallType}
                                    onChange={e => setWallType(e.target.value)}
                            >
                                <option value="" disabled hidden>Select...</option>
                                {wallTypes.map(i => (
                                    <option key={i} value={i}>{i}</option>
                                ))}
                            </select>
                        </>
                    }

                    {(selectedInvestmentPropertyType == "House" || selectedInvestmentPropertyType == "Granny Flat" || selectedInvestmentPropertyType == "Townhouse" || selectedInvestmentPropertyType == "Apartment") &&
                        <>
                            <label htmlFOr="cc-numberOfBedrooms" className="block mt-4"><span>How many bedrooms?</span></label>
                            <input type="number" className="mt-4 px-4 py-2 border-1"  name="cc-numberOfBedrooms" id="cc-numberOfBedrooms" value={numberOfBedrooms} onChange={e => setNumberOfBedrooms(e.target.value)} required />           
                        </>
                    }

                    {!!selectedInvestmentPropertyType && selectedInvestmentPropertyType != "Granny Flat" &&
                        <>    
                            <div className="mt-4">
                                <span className="block">Does the property have a basement?</span>
                                <div className="flex gap-4 mt-2">
                                    <label className="inline-flex items">
                                        <input type="radio" name="cc-basement" value="yes" className="form-radio" checked={isBasement == "yes"} onChange={e => setIsBasement(e.target.value)} />
                                        <span className='ml-2'>Yes</span>
                                    </label>
                                    <label className="inline-flex items">
                                        <input type="radio" name="cc-basement" value="no" className="form-radio" checked={isBasement == "no"} onChange={e => setIsBasement(e.target.value)} />
                                        <span className='ml-2'>No</span>
                                    </label>
                                </div>
                            </div>
                        </>
                    }
                    {(selectedInvestmentPropertyType == "Office" || selectedInvestmentPropertyType == "Warehouse") &&
                        <>
                            <div className="mt-4">
                                <span className="block">Does the property have a mezziane?</span>
                                <div className="flex gap-4 mt-2">
                                    <label className="inline-flex items">
                                        <input type="radio" name="cc-mezzaine" value="yes" className="form-radio" checked={isMezzaine == "yes"} onChange={e => setIsMezzaine(e.target.value)} />
                                        <span className='ml-2'>Yes</span>
                                    </label>
                                    <label className="inline-flex items">
                                        <input type="radio" name="cc-mezzaine" value="no" className="form-radio" checked={isMezzaine == "no"} onChange={e => setIsMezzaine(e.target.value)} />
                                        <span className='ml-2'>No</span>
                                    </label>
                                </div>
                            </div>
                        </>
                    }
                    {(selectedInvestmentPropertyType == "Office" || selectedInvestmentPropertyType == "House" || selectedInvestmentPropertyType == "Apartment") &&
                        <>
                            <div className="mt-4">
                                <span className="block">Does the property have an elevator?</span>
                                <div className="flex gap-4 mt-2">
                                    <label className="inline-flex items">
                                        <input type="radio" name="cc-elevator" value="yes" className="form-radio" checked={isElevator == "yes"} onChange={e => setIsElevator(e.target.value)} />
                                        <span className='ml-2'>Yes</span>
                                    </label>
                                    <label className="inline-flex items">
                                        <input type="radio" name="cc-elevator" value="no" className="form-radio" checked={isElevator == "no"} onChange={e => setIsElevator(e.target.value)} />
                                        <span className='ml-2'>No</span>
                                    </label>
                                </div>
                            </div>
                        </>
                    }
                </div>
                <div className="flex-1 p-10 flex flex-col sticky gap-5">
                    <h1 className="text-2xl font-bold">Results</h1>
                    <div className="border-1 rounded-md bg-orange font-white flex p-3">
                        <span>Finished (selected)</span><span className="text-xl ml-auto">$0</span>
                    </div>
                    <div className="border-1 rounded-md font-white flex p-3">
                        <span>Low estimate</span><span className="text-xl ml-auto">$0</span>
                    </div>
                    <div className="border-1 rounded-md font-white flex p-3">
                        <span>High estimate</span><span className="text-xl ml-auto">$0</span>
                    </div>

                </div>
            </div>
                <button class="ml-auto mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Calculate</button>
        </div>
    )
}