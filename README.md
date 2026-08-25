# TypeScript Core (@mantlebee/ts-core)

> Common types, patterns, and utilities for TypeScript projects.

A comprehensive library providing foundational components, design patterns, and utility functions to establish a uniform approach to developing TypeScript applications. This package emphasizes code reusability, maintainability, and consistent architecture across projects.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Core Concepts](#core-concepts)
  - [Common Types & Utilities](#common-types--utilities)
  - [Builders & Factories](#builders--factories)
  - [Subscriptions & Observables](#subscriptions--observables)
  - [Delays & Alarms](#delays--alarms)
  - [Delegates](#delegates)
  - [Identities & Identity Management](#identities--identity-management)
  - [Loggers](#loggers)
  - [Wizards](#wizards)
  - [Colors](#colors)
  - [Parsers & Tokenizers](#parsers--tokenizers)
  - [Scheduling](#scheduling)
  - [Calendar](#calendar)
  - [Exceptions](#exceptions)
  - [Debug Mode](#debug-mode)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Features

- 🏗️ **Design Patterns**: Builder, Factory, and Wizard patterns
- 🔔 **Event Management**: Subscribable objects for reactive programming
- ⏱️ **Time Management**: Alarms, delays, and scheduling capabilities
- 📝 **Logging**: Flexible logging system with multiple output strategies
- 🎨 **Color Utilities**: Comprehensive color manipulation and conversion
- 🔑 **Identity Management**: Numeric and GUID-based identity generators
- 🧩 **Type System**: Rich TypeScript types for common scenarios
- 📦 **Utility Functions**: Array, object, string, and value manipulation helpers
- ⚙️ **Tokenization**: Text parsing and tokenization framework
- 🎭 **Wizard Workflow**: State-based step-by-step workflow management
- 🐛 **Debug Support**: Toggle debug/release mode for conditional behavior

## Installation

```bash
npm install @mantlebee/ts-core
```

Or with yarn:

```bash
yarn add @mantlebee/ts-core
```

## Quick Start

```typescript
import {
  Subscribable,
  Logger,
  ConsoleLogger,
  NumericIdentityManager,
  Alarm,
  Color,
  Builder,
  Wizard
} from '@mantlebee/ts-core';

// Create a subscribable event system
const event = new Subscribable<string>();
event.subscribe((data) => console.log('Received:', data));
event.notifyData('Hello World');

// Use the console logger
const logger = new ConsoleLogger();
logger.logInfo('Application started');

// Generate unique IDs
const idManager = new NumericIdentityManager();
const id1 = idManager.newValue(); // 1
const id2 = idManager.newValue(); // 2

// Create and manipulate colors
const color = new Color(255, 128, 64);
console.log(color.hex()); // #ff8040
console.log(color.rgb()); // rgb(255,128,64)
```

## Core Concepts

### Common Types & Utilities

The **common** module provides fundamental types and utility functions used throughout the library.

#### Types

- `List<T>` - Array type alias
- `Dictionary<T>` - Object with string keys mapping to type T
- `Nullable<T>` - Type that can be T or null
- `Any` - Any type alias
- `KeyOf<T>` - Union of all keys of type T
- `Constructable<T>` - Constructor function type
- `Indexable<T>` - Object that can be indexed with strings

#### Utility Functions

**Array Utilities:**
```typescript
import { firstOrDefault, listToDictionary, replaceListItems } from '@mantlebee/ts-core';

// Find first item or get default
const item = firstOrDefault([1, 2, 3], a => a === 2); // 2
const notFound = firstOrDefault([1, 2, 3], a => a === 5, -1); // -1

// Convert array to dictionary
const users = [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}];
const userDict = listToDictionary(users, 'id');
// { 1: {id: 1, name: 'John'}, 2: {id: 2, name: 'Jane'} }

// Replace array items in-place
const list = [1, 2, 3];
const ref = list;
replaceListItems(list, [4, 5, 6]);
// ref is now [4, 5, 6]
```

**Object Utilities:**
```typescript
import { isObject, objectHasKey } from '@mantlebee/ts-core';

isObject({}) // true
isObject([]) // false
isObject(null) // false

objectHasKey({name: 'John'}, 'name') // true
objectHasKey({name: 'John'}, 'age') // false
```

**String, Number, and Date Utilities:**
The library includes utilities for string manipulation, number formatting, character handling, boolean parsing, and date calculations.

### Builders & Factories

Implement the **Builder** and **Factory** design patterns for flexible object construction.

#### Builder Pattern

The `Builder` class uses a factory to create objects with support for debug/release modes:

```typescript
import { Builder, IFactory } from '@mantlebee/ts-core';

// Define your factory
class MyObjectFactory implements IFactory<MyObject> {
  createDebug(): MyObject {
    return new MyObject({ verbose: true });
  }
  
  createRelease(): MyObject {
    return new MyObject({ verbose: false });
  }
}

// Use the builder
const builder = new Builder(new MyObjectFactory());
const obj = builder.build(); // Creates debug or release version based on DebugMode
```

#### Factory Pattern

The `Factory` interface allows you to define creation strategies:

```typescript
import { IFactory } from '@mantlebee/ts-core';

const factory: IFactory<string> = {
  createDebug: () => 'Debug Version',
  createRelease: () => 'Release Version'
};
```

### Subscriptions & Observables

Implement reactive programming patterns with the **Subscribable** class.

```typescript
import { Subscribable } from '@mantlebee/ts-core';

// Create a subscribable with a specific data type
const userUpdates = new Subscribable<{id: number, name: string}>();

// Subscribe to events
const subscriptionId = userUpdates.subscribe((user) => {
  console.log(`User updated: ${user.name}`);
});

// Notify all subscribers
userUpdates.notifyData({id: 1, name: 'Alice'});

// Unsubscribe
userUpdates.unsubscribe(subscriptionId);
```

**Key Features:**
- Type-safe data passing
- Multiple subscribers support
- Numeric subscription IDs for management
- Automatic subscription tracking

### Delays & Alarms

Schedule and manage time-based operations with **Alarm**.

```typescript
import { Alarm } from '@mantlebee/ts-core';

// Create an alarm for a future date
const futureDate = new Date(Date.now() + 5000); // 5 seconds from now

const alarm = new Alarm(futureDate, (stop, snooze) => {
  console.log('Alarm triggered!');
  
  // You can stop the alarm
  stop();
  
  // Or snooze it for another 3 seconds
  // snooze(3000);
});

// Check alarm status
console.log(alarm.expired); // false (until 5 seconds pass)
console.log(alarm.stopped); // false

// Manually stop the alarm
alarm.stop();

// Snooze the alarm
alarm.snooze(2000); // Delay execution by 2 more seconds
```

**Alarm Properties:**
- `expired`: Check if the alarm time has passed
- `stopped`: Check if the alarm has been stopped
- `snooze(ms)`: Delay execution by specified milliseconds
- `stop()`: Stop the alarm from executing

### Delegates

Manage function execution with specialized delegate types.

#### Debounced Delegate

Prevent multiple rapid function executions:

```typescript
import { DebouncedDelegate } from '@mantlebee/ts-core';

const saveToServer = (data: string) => {
  console.log('Saving:', data);
};

// Create a debounced version (300ms delay)
const debouncedSave = new DebouncedDelegate(saveToServer, 300);

// Simulate rapid calls
debouncedSave.call('v1');
debouncedSave.call('v2');
debouncedSave.call('v3'); // Only this one will execute after 300ms
```

**Use Cases:**
- Search input handling
- Auto-save functionality
- Window resize handlers
- API call throttling

### Identities & Identity Management

Generate and manage unique identifiers.

#### Numeric Identity Manager

Generate sequential numeric IDs:

```typescript
import { NumericIdentityManager } from '@mantlebee/ts-core';

const idManager = new NumericIdentityManager();
console.log(idManager.newValue()); // 1
console.log(idManager.newValue()); // 2
console.log(idManager.lastValue);  // 2

// Start from a specific number
const manager = new NumericIdentityManager(100);
console.log(manager.newValue()); // 101
```

#### GUID Identity Manager

Generate unique GUIDs:

```typescript
import { GuidIdentityManager } from '@mantlebee/ts-core';

const guidManager = new GuidIdentityManager();
const id1 = guidManager.newValue(); // e.g., "550e8400-e29b-41d4-a716-446655440000"
const id2 = guidManager.newValue(); // Different GUID
console.log(guidManager.lastValue);
```

#### Typed Keys

Create type-safe keys with identity:

```typescript
import { TypedKey } from '@mantlebee/ts-core';

interface User {
  id: number;
  name: string;
}

const userKey = new TypedKey<User>('user');
// Keys are guaranteed to be type-safe
```

### Loggers

Implement flexible logging with multiple strategies.

#### Logger Interface

```typescript
import { Logger, LogTypes, ILogger } from '@mantlebee/ts-core';

// Create a custom logger
const customLogger = new Logger((type, message, data) => {
  console.log(`[${type}] ${message}`, data);
});

customLogger.logInfo('User logged in');
customLogger.logError('Connection failed', { error: 'TIMEOUT' });
customLogger.logDebug('Variable state', { var: 123 });
customLogger.logWarning('Deprecated API used');
customLogger.logSuccess('Operation completed');
```

#### Console Logger

Pre-configured logger for console output:

```typescript
import { ConsoleLogger } from '@mantlebee/ts-core';

const logger = new ConsoleLogger();
logger.logInfo('Starting application');
logger.logError('An error occurred');
```

#### Subscribable Logger

Listen to log events:

```typescript
import { SubscribableLogger, LogTypes } from '@mantlebee/ts-core';

const logger = new SubscribableLogger();

logger.subscribe(({type, message, data}) => {
  if (type === LogTypes.error) {
    sendToErrorTracker(message, data);
  }
});

logger.logError('Critical error', { code: 500 });
```

**Log Types:**
- `debug` - Debug information
- `info` - General information
- `success` - Success messages
- `warning` - Warning messages
- `error` - Error messages

### Wizards

Manage complex multi-step workflows with state and validation.

```typescript
import { Wizard, IWizardStep } from '@mantlebee/ts-core';

// Define wizard steps
const steps: IWizardStep[] = [
  { name: 'step1', validate: () => true },
  { name: 'step2', validate: () => true },
  { name: 'step3', validate: () => true }
];

// Create wizard context
const context = {
  canAbort: true,
  canComplete: true,
  abort: () => Promise.resolve(),
  complete: () => Promise.resolve()
};

// Initialize wizard
const wizard = new Wizard(context, steps);

// Check current state
console.log(wizard.step.name);      // Current step
console.log(wizard.status);         // Current status
console.log(wizard.canGoForward);   // Can advance?
console.log(wizard.canGoBack);      // Can go back?

// Navigate through steps
await wizard.start();
await wizard.goForward();
await wizard.goBack();
await wizard.complete();
```

**Wizard Statuses:**
- `needToStart` - Wizard not yet started
- `idle` - Ready for action
- `running` - Currently executing a step
- `aborting` - Being aborted
- `aborted` - Aborted state
- `completing` - Being completed
- `completed` - Completed state

**Enablable Base Class:**

Common base class for things that can be enabled/disabled:

```typescript
import { Enablable } from '@mantlebee/ts-core';

const feature = new Enablable(false);
console.log(feature.isEnabled); // false

feature.enable();
console.log(feature.isEnabled); // true

feature.disable();
console.log(feature.isEnabled); // false
```

### Colors

Comprehensive color manipulation and format conversion.

```typescript
import { Color } from '@mantlebee/ts-core';

// Create a color with RGBA values
const color = new Color(255, 128, 64, 1);

// Access individual channels
console.log(color.red);   // 255
console.log(color.green); // 128
console.log(color.blue);  // 64
console.log(color.alpha); // 1

// Convert to different formats
console.log(color.hex());    // #ff8040
console.log(color.rgb());    // rgb(255,128,64)
console.log(color.rgba());   // rgba(255,128,64,1)
console.log(color.hsl());    // hsl(20,100%,63%)
console.log(color.hsla());   // hsla(20,100%,63%,1)

// Get contrasting color for readability
const contrast = color.contrast(); // Returns white or black Color instance

// Create from existing formats
const fromHex = Color.fromHex('#ff8040');
const fromRgb = Color.fromRgb('rgb(255,128,64)');
const fromHsl = Color.fromHsl('hsl(20,100%,63%)');
const fromName = Color.fromWebColorName('red');
```

**Supported Formats:**
- Hex (#RRGGBB, #RRGGBBAA)
- RGB/RGBA (rgb(), rgba())
- HSL/HSLA (hsl(), hsla())
- Web color names (red, blue, green, etc.)

### Parsers & Tokenizers

Parse and tokenize text with flexible rule-based system.

```typescript
import { Tokenizer } from '@mantlebee/ts-core';

// Define tokenization rules
const rules = [
  { match: /\d+/, type: 'number' },
  { match: /\+|-|\*|\//, type: 'operator' },
  { match: /\s+/, type: 'whitespace' }
];

// Create tokenizer
const tokenizer = new Tokenizer(rules);

// Tokenize text
const result = tokenizer.tokenize('1 + 2 * 3');
// [
//   { type: 'number', value: '1' },
//   { type: 'whitespace', value: ' ' },
//   { type: 'operator', value: '+' },
//   ...
// ]
```

**Tokenizer Features:**
- Rule-based pattern matching
- Support for regex patterns
- Token type classification
- Sequential token extraction

### Scheduling

Define and manage schedule patterns for recurring events.

```typescript
import { 
  OneTimeSchedule, 
  DailySchedule, 
  WeeklySchedule,
  MonthlyByDaySchedule,
  WeekDays,
  Months
} from '@mantlebee/ts-core';

// One-time execution
const oneTime: OneTimeSchedule = {
  startDate: new Date('2024-08-25')
};

// Daily execution
const daily: DailySchedule = {
  startDate: new Date(),
  every: 3, // Every 3 days
  repeat: { every: { hours: 0, minutes: 30 } } // Repeat every 30 minutes
};

// Weekly execution
const weekly: WeeklySchedule = {
  startDate: new Date(),
  days: [WeekDays.monday, WeekDays.wednesday, WeekDays.friday],
  every: 2 // Every 2 weeks
};

// Monthly execution by day
const monthlyByDay: MonthlyByDaySchedule = {
  startDate: new Date(),
  days: [5, 15, 25], // 5th, 15th, 25th of each month
  months: [Months.january, Months.february]
};
```

**Schedule Types:**
- `OneTimeSchedule` - Execute once at specific date/time
- `DailySchedule` - Execute every X days
- `WeeklySchedule` - Execute on specific days of the week
- `MonthlyByDaySchedule` - Execute on specific days of months
- `MonthlyByWeeklyDaySchedule` - Execute on specific weekly days (e.g., first Monday)

### Calendar

Calendar constants and utilities.

```typescript
import { WeekDays, Months, MonthWeekConditions } from '@mantlebee/ts-core';

const weekDay = WeekDays.monday;
const month = Months.january;
const condition = MonthWeekConditions.first; // First occurrence
```

### Exceptions

Custom exception handling with codes.

```typescript
import { Exception } from '@mantlebee/ts-core';

// Create custom exceptions
class ValidationException extends Exception {
  constructor(message: string) {
    super('VALIDATION_ERROR', message);
  }
}

// Throw and catch
try {
  throw new ValidationException('Invalid email format');
} catch (error) {
  if (error instanceof Exception && error.code === 'VALIDATION_ERROR') {
    console.log('Validation failed:', error.message);
  }
}
```

### Debug Mode

Toggle debug/release mode globally for conditional behavior.

```typescript
import { DebugMode } from '@mantlebee/ts-core';

// Check current state
console.log(DebugMode.isEnabled); // false by default

// Enable debug mode
DebugMode.enable();
console.log(DebugMode.isEnabled); // true

// Disable debug mode
DebugMode.disable();

// Use in your code
if (DebugMode.isEnabled) {
  console.log('Detailed debug information');
} else {
  console.log('Production mode');
}
```

**Integration with Builder:**

```typescript
import { Builder, DebugMode } from '@mantlebee/ts-core';

DebugMode.enable();
const obj = builder.build(); // Uses createDebug()

DebugMode.disable();
const obj = builder.build(); // Uses createRelease()
```

## API Reference

For detailed API documentation, please visit: [https://mantlebee.github.io/ts-core/](https://mantlebee.github.io/ts-core/)

## Examples

### Example 1: Event-Driven Logger

```typescript
import { SubscribableLogger, Subscribable, LogTypes } from '@mantlebee/ts-core';

const logger = new SubscribableLogger();
const errorAlert = new Subscribable<string>();

// Forward errors to alert system
logger.subscribe(({type, message}) => {
  if (type === LogTypes.error) {
    errorAlert.notifyData(message);
  }
});

// Subscribe to alerts
errorAlert.subscribe((message) => {
  console.error('🚨 ALERT:', message);
  // Send to error tracking service
});

// Use the logger
logger.logError('Database connection failed');
```

### Example 2: Building with Factory Pattern

```typescript
import { Builder, IFactory } from '@mantlebee/ts-core';

class ApiClient {
  constructor(private debug: boolean) {}
  
  async fetch(url: string) {
    if (this.debug) console.log('Fetching:', url);
    return fetch(url);
  }
}

class ApiFactory implements IFactory<ApiClient> {
  createDebug() { return new ApiClient(true); }
  createRelease() { return new ApiClient(false); }
}

const builder = new Builder(new ApiFactory());
const client = builder.build();
```

### Example 3: Debounced Search

```typescript
import { DebouncedDelegate } from '@mantlebee/ts-core';

const searchAPI = (query: string) => {
  console.log('Searching for:', query);
  // Perform actual search
};

const debouncedSearch = new DebouncedDelegate(searchAPI, 500);

// Simulate user typing
const input = 'typescript';
input.split('').forEach((char, i) => {
  setTimeout(() => {
    debouncedSearch.call(input.substring(0, i + 1));
  }, 100 * i);
});
// Only one search call will be made after user stops typing
```

### Example 4: Multi-Step Workflow

```typescript
import { Wizard, IWizardStep } from '@mantlebee/ts-core';

const steps: IWizardStep[] = [
  { name: 'login', validate: () => validateCredentials() },
  { name: 'mfa', validate: () => validateMFA() },
  { name: 'profile', validate: () => validateProfile() }
];

const wizard = new Wizard(
  {
    canAbort: true,
    canComplete: true,
    complete: () => saveUserData()
  },
  steps
);

// Navigate workflow
await wizard.start();
while (wizard.canGoForward) {
  await wizard.goForward();
  console.log('Completed:', wizard.previousSteps.length);
}
await wizard.complete();
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT License - See LICENSE file for details

---

**Repository:** [https://github.com/mantlebee/ts-core](https://github.com/mantlebee/ts-core)

**Issues:** [https://github.com/mantlebee/ts-core/issues](https://github.com/mantlebee/ts-core/issues)

**Documentation:** [https://mantlebee.github.io/ts-core/](https://mantlebee.github.io/ts-core/)
