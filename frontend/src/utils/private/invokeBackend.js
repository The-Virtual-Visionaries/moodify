import axios from "axios";
import { BACKEND_URI } from "../../config/env.config";
import { AI_BACKEND_URI } from "../../config/env.config";

const authData = JSON.parse(localStorage.getItem("authData"));
let token;

if (authData && authData.token) {
  token = authData.token;
}

// users route

export const getProfile = async () => {
  const response = await axios.get(`${BACKEND_URI}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const putProfile = async (data) => {
  const response = await axios.put(`${BACKEND_URI}/users/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// usermoods route

export const getUsermoods = async () => {
  const response = await axios.get(`${BACKEND_URI}/usermood/get-usermoods`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addUsermood = async (data) => {
  const response = await axios.post(`${BACKEND_URI}/usermood/add-mood`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const dayUsermood = async (data) => {
  const response = await axios.get(
    `${BACKEND_URI}/usermood/day-usermood`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getStreak = async () => {
  const response = await axios.get(`${BACKEND_URI}/usermood/get-streak`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const checkMoodInputToday = async () => {
  const response = await axios.get(
    `${BACKEND_URI}/usermood/check-mood-input-today`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// grateful route

export const getGratefuls = async () => {
  const response = await axios.get(`${BACKEND_URI}/grateful/get-gratefuls`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addGrateful = async (data) => {
  const response = await axios.post(
    `${BACKEND_URI}/grateful/add-grateful`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// meeting route

export const scheduleMeeting = async (data) => {
  const response = await axios.post(
    `${BACKEND_URI}/meeting/schedule-meeting`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getSortedUpcoming = async (data) => {
  console.log(data);
  const response = await axios.get(
    `${BACKEND_URI}/meeting/get-sorted-upcoming`,
    {
      params: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.data);
  return response.data;
};

export const listTherapists = async () => {
  const response = await axios.get(`${BACKEND_URI}/meeting/list-therapists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getPatient = async () => {
  const response = await axios.get(`${BACKEND_URI}/patients`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getTherapists = async () => {
  const response = await axios.get(`${BACKEND_URI}/therapists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const assignTherapist = async (data) => {
  const response = await axios.post(`${BACKEND_URI}/patients/assign`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const unassignTherapist = async (data) => {
  const response = await axios.post(`${BACKEND_URI}/patients/unassign`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const putEmergencyContact = async (data) => {
  const response = await axios.put(`${BACKEND_URI}/patients/emergency`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
