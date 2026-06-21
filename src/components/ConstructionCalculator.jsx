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
        <div className="mx-20">
            <div className="mt-4">
                <h1 className="text-2xl font-bold">Construction Cost Calculator</h1>
                <div className="border-b-1">
                    <p>Knowing the costs of building a property in Australia is essential for budget control and monitoring.</p>
                    <p>To estimate how much it will cost to build a house, use our construction cost calculator. Every house is different in size, floor area, and finish.</p>
                </div>
                
                <label htmlFor="cc-constructionYear" className="block mt-4"><span>What year was construction completed?</span></label>
                <select className="form-control mt-4" style={{width: "58.33%"}}
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
                <select className="form-control mt-4" style={{width: "58.33%"}}
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
                <select className="form-control mt-4" style={{width: "58.33%"}}
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
                <select className="form-control mt-4" style={{width: "58.33%"}}
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
                <div className="mt-4 flex" style={{width: "58.33%"}}>
                    <input type="number" className="flex-1" name="cc-floorArea" id="cc-floorArea" value={floorArea} onChange={e => setFloorArea(e.target.value)} required />
                    <span className="bg-gray-100 p-2 border-1 flex-none">m<sup>2</sup></span>
                </div>

                <label htmlFOr="cc-numberOfFloors" className="block mt-4"><span>What is the number of floors?</span></label>
                <input type="number" className="mt-4" style={{width: "58.33%"}} name="cc-numberOfFloors" id="cc-numberOfFloors" value={numberOfFloors} onChange={e => setNumberOfFloors(e.target.value)} required />     
                    
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
                <select className="form-control mt-4" style={{width: "58.33%"}}
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

                <label htmlFOr="cc-wallType" className="block mt-4"><span>What is the construction wall type?</span></label>
                <select className="form-control mt-4" style={{width: "58.33%"}}
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
            </div>
        </div>
    )
}