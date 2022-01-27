import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isError) {
      setIsLoading(false);
    }
  }, [isError]);

  const loadComponent = (
    // <Box sx={{ display: "flex", textAlign: "center" }}>
    //   <Box m="auto" p="2">
    //     {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
    //     {isError && (
    //       <div>
    //         <ErrorIcon size="large" />
    //         <Typography variant="h3">ERROR CONTACTING SERVER</Typography>
    //       </div>
    //     )}
    //   </Box>
    // </Box>
    <></>
  );

  return { loadComponent, isLoading, setIsLoading, isError, setIsError };
};
