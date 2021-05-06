// Counts number of button presses
// output count to serial
// blink a led according to count

byte switchPinG = 8;                    // switch is connected to pin 2
byte switchPinB = 8; 
byte ledPin = 13;                      // led on pin 13
byte buttonPressesG = 0;                // how many times the button has been pressed 
byte lastPressCountG = 0;               // to keep track of last press count
byte buttonPressesB = 0;                // how many times the button has been pressed 
byte lastPressCountB = 0;

void setup() {

  pinMode(switchPinG, INPUT);          // Set the switch pin as input
  digitalWrite(switchPinG, HIGH);      // set pullup resistor
  pinMode(switchPinB, INPUT);          // Set the switch pin as input
  digitalWrite(switchPinB, HIGH);      // set pullup resistor
  Serial.begin(9600);                 // Set up serial communication at 9600bps
}

void loop(){
  if (digitalRead(switchPinG) == LOW)  // check if button was pressed
  {
    buttonPressesG++;                  // increment buttonPresses count
    delay(450);                       // debounce switch
  } 
  if (digitalRead(switchPinB) == LOW)  // check if button was pressed
  {
    buttonPressesB++;                  // increment buttonPresses count
    delay(450);                       // debounce switch
  }
  
  if (lastPressCountG != buttonPressesG)              // only do output if the count has changed
  {
    Serial.print ("Button press count = ");          // out to serial
    Serial.println(buttonPressesG, DEC);

    lastPressCountG = buttonPressesG;    // track last press count
  }
  if (lastPressCountB != buttonPressesB)              // only do output if the count has changed
  {
    Serial.print ("Button press count = ");          // out to serial
    Serial.println(buttonPressesB, DEC);

    lastPressCountB = buttonPressesB;    // track last press count
  }
