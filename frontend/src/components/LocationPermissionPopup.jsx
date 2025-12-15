import React from "react";

const LocationPermissionPopup = ({ visible = true, onAllow, onClose }) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 60,
      }}
    >
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Allow location access</h3>
        <p className="text-sm text-gray-600 mb-4">
          Please allow access to your device location so we can update your
          position in real time and show nearby rides.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Maybe later
          </button>
          <button
            onClick={onAllow}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Allow
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPermissionPopup;
