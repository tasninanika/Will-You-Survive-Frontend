import { useState } from "react";

const FormStep2 = ({ onNext }) => {
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
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    for (let key in form) {
      if (!form[key]) {
        alert("Please fill all fields");
        return;
      }
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
  };

  return (
    <div className="max-w-4xl mx-auto mt-24 p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg">
      <h2 className="text-white text-2xl font-bold mb-6 text-center">
        Passenger Info for Prediction
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Class */}
        <div>
          <label className="text-white font-semibold block mb-1">Class</label>
          <select
            name="pclass"
            value={form.pclass}
            onChange={handleChange}
            className="w-full p-2 rounded-lg text-black"
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
            className="w-full p-2 rounded-lg text-black"
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
            className="w-full p-2 rounded-lg text-black"
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
            className="w-full p-2 rounded-lg text-black"
          />
        </div>

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
            className="w-full p-2 rounded-lg text-black"
          />
        </div>

        {/* Fare */}
        <div>
          <label className="text-white font-semibold block mb-1">Fare</label>
          <input
            type="number"
            name="fare"
            placeholder="Enter Fare"
            value={form.fare}
            onChange={handleChange}
            className="w-full p-2 rounded-lg text-black"
          />
        </div>

        {/* Embarked */}
        <div className="md:col-span-2">
          <label className="text-white font-semibold block mb-1">
            Port of Embarkation
          </label>
          <select
            name="embarked"
            value={form.embarked}
            onChange={handleChange}
            className="w-full p-2 rounded-lg text-black"
          >
            <option value="">Select Port</option>
            <option value={0}>Cherbourg (C)</option>
            <option value={1}>Queenstown (Q)</option>
            <option value={2}>Southampton (S)</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 w-full py-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white rounded-full font-bold shadow-lg"
      >
        Next
      </button>
    </div>
  );
};

export default FormStep2;
