import { useState } from 'react'
import { calculateConstructionCost } from '../utils/calculations'

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

    // Perform cost calculation if basic fields are populated
    const hasRequiredInputs = 
        selectedYear && 
        selectedInvestmentPropertyType && 
        selectedInvestmentPropertyState && 
        floorArea > 0 && 
        numberOfFloors > 0 &&
        // For residential types, wallType is required
        ((selectedInvestmentPropertyType !== "House" && 
          selectedInvestmentPropertyType !== "Granny Flat" && 
          selectedInvestmentPropertyType !== "Townhouse") || selectedWallType);

    const results = hasRequiredInputs ? calculateConstructionCost({
        propertyType: selectedInvestmentPropertyType,
        state: selectedInvestmentPropertyState,
        year: selectedYear,
        wallType: selectedWallType,
        bedrooms: numberOfBedrooms,
        floors: numberOfFloors,
        floorArea: floorArea,
        hasBasement: isBasement === "yes",
        hasDucted: isDuctAirConditioning === "yes",
        hasMezzanine: isMezzaine === "yes",
        hasElevator: isElevator === "yes",
        finishLevel: selectedSpecFinishLevel
    }) : {
        lowEstimate: 0,
        midEstimate: 0,
        highEstimate: 0,
        selectedEstimate: 0,
        bci: 1,
        baseWithoutElevator: 0,
        elevatorAllowance: 0
    };


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
                        {specFinishLevels.map(i => (
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
                    <div className="border-1 rounded-md bg-orange-400 text-white flex p-3">
                        <span>Finished (selected)</span>
                        <span className="text-xl font-bold ml-auto">
                            {results.selectedEstimate ? `$${results.selectedEstimate.toLocaleString()}` : '$0'}
                        </span>
                    </div>
                    <div className="border-1 rounded-md bg-gray-100 flex p-3">
                        <span>Low estimate</span>
                        <span className="text-xl font-bold ml-auto">
                            {results.lowEstimate ? `$${results.lowEstimate.toLocaleString()}` : '$0'}
                        </span>
                    </div>
                    <div className="border-1 rounded-md bg-gray-100 flex p-3">
                        <span>High estimate</span>
                        <span className="text-xl font-bold ml-auto">
                            {results.highEstimate ? `$${results.highEstimate.toLocaleString()}` : '$0'}
                        </span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold border-b-1 mb-2">How your estimate is calculated</h2>
                        {!hasRequiredInputs ? (
                            <p className="text-gray-500 text-sm">Enter your details to see a step‑by‑step calculation breakdown.</p>
                        ) : (
                            <div className="flex flex-col gap-3 text-sm text-gray-700">
                                <div className="bg-gray-50 border rounded-lg p-3">
                                    <div className="font-semibold mb-1">Your inputs</div>
                                    <div>Type: <strong>{selectedInvestmentPropertyType.toLowerCase()}</strong> · Bedrooms: <strong>{numberOfBedrooms}</strong> · Storeys: <strong>{numberOfFloors}</strong> · Area: <strong>{floorArea} m²</strong></div>
                                    <div>Wall: <strong>{selectedWallType || '-'}</strong> · Spec: <strong>{selectedSpecFinishLevel}</strong></div>
                                    <div>Location & year: <strong>{selectedInvestmentPropertyState === "Victoria" ? "VIC" : selectedInvestmentPropertyState === "Queensland" ? "QLD" : selectedInvestmentPropertyState === "New South Wales" ? "NSW" : selectedInvestmentPropertyState === "South Australia" ? "SA" : selectedInvestmentPropertyState === "Western Australia" ? "WA" : selectedInvestmentPropertyState === "Tasmania" ? "TAS" : selectedInvestmentPropertyState === "Northern Territory" ? "NT" : selectedInvestmentPropertyState === "Australian Capital Territory" ? "ACT" : selectedInvestmentPropertyState}</strong>, <strong>{selectedYear}</strong> (index <strong>{results.bci.toFixed(3)}</strong>)</div>
                                    <div>Options chosen: Ducted <strong>{isDuctAirConditioning === 'yes' ? 'Yes' : 'No'}</strong> · Basement <strong>{isBasement === 'yes' ? 'Yes' : 'No'}</strong> · Mezzanine <strong>{isMezzaine === 'yes' ? 'Yes' : 'No'}</strong> · Elevator <strong>{isElevator === 'yes' ? 'Yes' : 'No'}</strong></div>
                                </div>
                                <div className="bg-gray-50 border rounded-lg p-3">
                                    <div className="font-semibold mb-1">How we calculated it</div>
                                    <div>1) Core build cost based on your type, walls, size, bedrooms and storeys.</div>
                                    <div className="text-gray-900">Estimated core (incl. options except elevator) after location/year = <strong>${results.baseWithoutElevator.toLocaleString()}</strong></div>
                                    {isElevator === "yes" && (
                                        <>
                                            <div className="mt-2">2) Elevator allowance added for multi‑storey access.</div>
                                            <div className="text-gray-900">Elevator add after location/year = <strong>${results.elevatorAllowance.toLocaleString()}</strong></div>
                                        </>
                                    )}
                                    <div className="mt-2">{isElevator === "yes" ? '3' : '2'}) Finish level shown as Low / Selected finish / High.</div>
                                </div>
                                <div className="bg-gray-50 border rounded-lg p-3">
                                    <div className="font-semibold mb-1">What affects your estimate</div>
                                    <div>• Property type sets a base allowance.</div>
                                    <div>• Wall type adds to the base (brick veneer / double brick / concrete).</div>
                                    <div>• Options add to the base: {isBasement === "yes" ? "Basement, " : ""}{isDuctAirConditioning === "yes" ? "Ducted A/C, " : ""}{isMezzaine === "yes" ? "Mezzanine, " : ""}{isElevator === "yes" ? "Elevator allowance, " : ""}as selected.</div>
                                    <div>• Storeys and bedrooms apply small multipliers.</div>
                                    <div>• Floor area scales the whole result.</div>
                                    <div>• Location & year index (<strong>{results.bci.toFixed(3)}</strong>) adjusts for local build costs.</div>
                                </div>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-900">
                                    <div className="font-semibold mb-1">Totals (ex‑GST)</div>
                                    <div>Low (×0.91) = <strong>${results.lowEstimate.toLocaleString()}</strong></div>
                                    <div>Finish (selected) = <strong>${results.selectedEstimate.toLocaleString()}</strong></div>
                                    <div>High (×1.09) = <strong>${results.highEstimate.toLocaleString()}</strong></div>
                                    <div className="mt-2 text-xs text-green-700 font-semibold">GST-inclusive: ×1.10</div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
                {/*<button class="ml-auto mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Calculate</button>*/}
        </div>
    )
}