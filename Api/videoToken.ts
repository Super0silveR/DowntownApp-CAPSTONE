export const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJkYWEyZWE4Mi02MjM1LTRlNTYtOGEwMy02ZjE4ZGUwOGVkY2EiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwMTY0MDY4MCwiZXhwIjoxNzA0MjMyNjgwfQ._uXaJ0JJixHitdU8ct6Lso1EW_vIdpktw0hSbnvvtwg";

export const createRoom = async ({ token }: { token: string }) => {
  const response = await fetch("https://api.videosdk.live/v2/rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Correct syntax for Authorization header
    },
  });
  const { roomId } = await response.json();
  return roomId;
};
