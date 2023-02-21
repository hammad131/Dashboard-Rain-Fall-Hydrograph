#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>
//#include <FreeRTOS.h>
//#include <Adafruit_BME280.h>
//#include <Adafruit_Sensor.h>
#define LED1 25
#define LED2 26
const char *SSID = "ABC";
const char *PWD = "12345678";

const int red_pin = 5;   
const int green_pin = 18; 
const int blue_pin = 19; 

// Setting PWM frequency, channels and bit resolution
const int frequency = 5000;
const int redChannel = 0;
const int greenChannel = 1;
const int blueChannel = 2;
const int resolution = 8;

WebServer server(80);
 
//Adafruit_BME280 bme;

StaticJsonDocument<250> jsonDocument;
char buffer[250];

float temperature=40;
float humidity=50;
float pressure=60;
 
void setup_routing() {     
  server.on("/temperature", getTemperature);     
  server.on("/pressure", getPressure);     
  server.on("/humidity", getHumidity);     
  server.on("/data", getData);     
  server.on("/led1", HTTP_POST, handlePost);
  server.on("/led2", HTTP_POST, handlePost2);     
          
  server.begin();    
}
 
void create_json(char *tag, float value, char *unit) {  
  jsonDocument.clear();  
  jsonDocument["type"] = tag;
  jsonDocument["value"] = value;
  jsonDocument["unit"] = unit;
  serializeJson(jsonDocument, buffer);
}
 
void add_json_object(char *tag, float value, char *unit) {
  JsonObject obj = jsonDocument.createNestedObject();
  obj["type"] = tag;
  obj["value"] = value;
  obj["unit"] = unit; 
}

//void read_sensor_data(void * parameter) {
//   for (;;) {
//     temperature = 50;//bme.readTemperature();
//     humidity = 40;//bme.readHumidity();
//     pressure = 100;//bme.readPressure() / 100;
//     Serial.println("Read sensor data");
 
     //vTaskDelay(60000 / portTICK_PERIOD_MS);
//   }
//}
 
void getTemperature() {
  Serial.println("Get temperature");
  create_json("temperature", temperature, "°C");
  server.send(200, "application/json", buffer);
}
 
void getHumidity() {
  Serial.println("Get humidity");
  create_json("humidity", humidity, "%");
  server.send(200, "application/json", buffer);
}
 
void getPressure() {
  Serial.println("Get pressure");
  create_json("pressure", pressure, "hPa");
  server.send(200, "application/json", buffer);
}
 
void getData() {
  Serial.println("Get BME280 Sensor Data");
  jsonDocument.clear();
  add_json_object("temperature", temperature, "°C");
  add_json_object("humidity", humidity, "%");
  add_json_object("pressure", pressure, "hPa");
  serializeJson(jsonDocument, buffer);
  server.send(200, "application/json", buffer);
}

void handlePost() {
  if (server.hasArg("plain") == false) {
  }
  String body = server.arg("plain");
  deserializeJson(jsonDocument, body);

 // int red_value = jsonDocument["red"];
 // int green_value = jsonDocument["green"];
 // int blue_value = jsonDocument["blue"];
  bool LED1_value= jsonDocument["LED1"];
  //bool LED2_value= jsonDocument["LED2"];
  
 // ledcWrite(redChannel, red_value);
 // ledcWrite(greenChannel,green_value);
 // ledcWrite(blueChannel, blue_value);
  digitalWrite(LED1,LED1_value);
 // digitalWrite(LED2,LED2_value);

  server.send(200, "application/json", "{}");
}
void handlePost2() {
  if (server.hasArg("plain") == false) {
  }
  String body = server.arg("plain");
  deserializeJson(jsonDocument, body);

 // int red_value = jsonDocument["red"];
 // int green_value = jsonDocument["green"];
 // int blue_value = jsonDocument["blue"];
 // bool LED1_value= jsonDocument["LED1"];
  bool LED2_value= jsonDocument["LED2"];
  
 // ledcWrite(redChannel, red_value);
 // ledcWrite(greenChannel,green_value);
 // ledcWrite(blueChannel, blue_value);
 // digitalWrite(LED1,LED1_value);
  digitalWrite(LED2,LED2_value);

  server.send(200, "application/json", "{}");
}
/*
void setup_task() {    
  xTaskCreate(     
  read_sensor_data,      
  "Read sensor data",      
  1000,      
  NULL,      
  1,     
  NULL     
  );     
}
*/
void setup() {     
  Serial.begin(115200); 

  ledcSetup(redChannel, frequency, resolution);
  ledcSetup(greenChannel, frequency, resolution);
  ledcSetup(blueChannel, frequency, resolution);
 
  ledcAttachPin(red_pin, redChannel);
  ledcAttachPin(green_pin, greenChannel);
  ledcAttachPin(blue_pin, blueChannel);
  pinMode (LED1,OUTPUT);
  pinMode (LED2,OUTPUT);
         
 // if (!bme.begin(0x76)) {    
 //   Serial.println("BME280 not found! Check Circuit");    
 // }    
Serial.print("Setting AP (Access Point)…");
  // Remove the password parameter, if you want the AP (Access Point) to be open
  WiFi.softAP(SSID, PWD);

  IPAddress IP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(IP);
  /*
  Serial.print("Connecting to Wi-Fi");
  WiFi.begin(SSID, PWD);//
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
 */
 // Serial.print("Connected! IP Address: ");
  Serial.println(WiFi.localIP());
  //setup_task();    
  setup_routing();     
   
}    
       
void loop() {    
  server.handleClient();     
}