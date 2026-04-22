const CONFIG = {
  SUPABASE_URL: "https://kgmoyxcifnlbxxtewgtw.supabase.co",
  SUPABASE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnbW95eGNpZm5sYnh4dGV3Z3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MTgyODAsImV4cCI6MjA5MjI5NDI4MH0.hwxhHQRWZY2VpyqEWu8V5DrdqxO2lpdru1qqC-PnRkE",
  BUCKET: "cloudx"
};

const supabase = window.supabase.createClient(
  CONFIG.SUPABASE_URL,
  CONFIG.SUPABASE_KEY
);