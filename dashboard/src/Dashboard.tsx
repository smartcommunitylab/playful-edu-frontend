import { Link, Title, useTranslate } from "react-admin";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

export const Dashboard = () => {
  const translate = useTranslate();

  return (
    <>
      <Title title="titlePages.dashboard" />

      <Box>
        <Card style={{ padding: 20 }}>
          <Box textAlign="center" mb={4}>
            <h1>{translate("resources.dashboard.welcome")}</h1>
          </Box>

          <Box display="flex" justifyContent="center">
            <Link to="/domains">
              <Button color="primary" variant="contained">
                {translate("resources.dashboard.button")}
              </Button>
            </Link>
          </Box>
        </Card>
      </Box>
    </>
  );
};
