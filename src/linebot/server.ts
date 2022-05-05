/* linebot */
import { app } from "./index";

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, (): void => {
  console.log(`Application is live and listening on port ${PORT}`);
});
