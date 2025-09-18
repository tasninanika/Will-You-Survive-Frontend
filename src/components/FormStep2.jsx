import { useState } from "react";

const FormStep2 = ({ onNext }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    pclass: "",
    sex: "",
    age: "",
    sibsp: "",
    parch: "",
    fare: "",
    embarked: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!form.pclass || !form.sex || !form.age || !form.sibsp) {
        alert("Please fill all fields in this step");
        return;
      }
      setStep(2);
    } else {
      if (!form.parch || !form.fare || !form.embarked) {
        alert("Please fill all fields in this step");
        return;
      }
      const formattedForm = {
        ...form,
        pclass: parseInt(form.pclass),
        sex: parseInt(form.sex),
        age: parseFloat(form.age),
        sibsp: parseInt(form.sibsp),
        parch: parseInt(form.parch),
        fare: parseFloat(form.fare),
        embarked: parseInt(form.embarked),
      };
      onNext(formattedForm);
    }
  };

  const handlePrev = () => {
    if (step === 2) setStep(1);
  };

  return (
    <div className="max-w-4xl mx-auto mt-24 p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg">
      <h2 className="text-white text-2xl font-bold mb-3 text-center">
        Passenger Info for Prediction
      </h2>

      {/* Progress Bar */}
      <div className="w-full bg-white/20 h-2 rounded-full mb-6">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-600 transition-all duration-500"
          style={{ width: step === 1 ? "50%" : "100%" }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {step === 1 && (
          <>
            {/* Class */}
            <div>
              <label className="text-white font-semibold block mb-1">
                Class
              </label>
              <select
                name="pclass"
                value={form.pclass}
                onChange={handleChange}
                className="w-full p-2 rounded-lg text-black border border-purple-500"
              >
                <option value="">Select Class</option>
                <option value={1}>1st Class</option>
                <option value={2}>2nd Class</option>
                <option value={3}>3rd Class</option>
              </select>
            </div>

            {/* Sex */}
            <div>
              <label className="text-white font-semibold block mb-1">Sex</label>
              <select
                name="sex"
                value={form.sex}
                onChange={handleChange}
                className="w-full p-2 rounded-lg text-black border border-purple-500"
              >
                <option value="">Select Sex</option>
                <option value={0}>Male</option>
                <option value={1}>Female</option>
              </select>
            </div>

            {/* Age */}
            <div>
              <label className="text-white font-semibold block mb-1">Age</label>
              <input
                type="number"
                name="age"
                placeholder="Enter Age"
                value={form.age}
                onChange={handleChange}
                className="w-full p-2 rounded-lg text-black border border-purple-500"
              />
            </div>

            {/* Siblings/Spouses */}
            <div>
              <label className="text-white font-semibold block mb-1">
                Siblings/Spouses aboard
              </label>
              <input
                type="number"
                name="sibsp"
                placeholder="Enter number"
                value={form.sibsp}
                onChange={handleChange}
                className="w-full p-2 rounded-lg text-black border border-purple-500"
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {/* Parents/Children */}
            <div>
              <label className="text-white font-semibold block mb-1">
                Parents/Children aboard
              </label>
              <input
                type="number"
                name="parch"
                placeholder="Enter number"
                value={form.parch}
                onChange={handleChange}
                className="w-full p-2 rounded-lg text-black border border-purple-500"
              />
            </div>

            {/* Fare */}
            <div>
              <label className="text-white font-semibold block mb-1">
                Fare
              </label>
              <input
                type="number"
                name="fare"
                placeholder="Enter Fare"
                value={form.fare}
                onChange={handleChange}
                className="w-full p-2 rounded-lg text-black border border-purple-500"
              />
            </div>

            {/* Embarked */}
            <div>
              <label className="text-white font-semibold block mb-1">
                Port of Embarkation
              </label>
              <select
                name="embarked"
                value={form.embarked}
                onChange={handleChange}
                className="w-full p-2 rounded-lg text-black border border-purple-500"
              >
                <option value="">Select Port</option>
                <option value={0}>Cherbourg (C)</option>
                <option value={1}>Queenstown (Q)</option>
                <option value={2}>Southampton (S)</option>
              </select>
            </div>
          </>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        {step === 2 && (
          <button
            onClick={handlePrev}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 via-fuchsia-600 to-pink-500 text-white rounded-full font-bold shadow-lg"
          >
            Previous
          </button>
        )}

        <button
          onClick={handleNext}
          className="px-6 py-2 bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-600 text-white rounded-full font-bold shadow-lg ml-auto"
        >
          {step === 1 ? "Next Step" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default FormStep2;
