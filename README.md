

# Module 11 Homework

As we have entered the stable phase of our project with newly implemented features, shiny animations and a wide test base, it’s a perfect time to invest in performance improvements of our app and the level of performance monitoring (in order to not bring regression while extending the scope of app functionalities).  


### Homework management 🏠

The final result of all homework is the React Native Application full of features implemented iteratively in the end phase of each module in the course. In order to keep consistency and track all of your changes we highly recommend you to create your own GitHub repository where your work as a participant will be stored. Your GitHub repository should be shared with all trainers, which will enable us to verify your work and communicate:
- Wiktor Szlegier: https://github.com/Wiiktor22
- Adam Trzciński: https://github.com/adamTrz
- Mariusz Pasiński: https://github.com/mani3xis 

Each module in the course will end up with homework consisting of a few tasks to fulfil. We would like to suggest a comfortable system for you to submit each task of the homework as a separate PR to the main branch in your repository. This will create a space for us to communicate with you, by doing code reviews - thanks to that we will be able to check your homework, discuss some uncertainties, or respond to questions you will leave in the PR. In case you have any trouble with homework you can always book a 1 to 1 session with the trainer, and also don't hesitate to ask your questions in the dedicated communication channel. Keep in mind that you don't have to worry about being blocked for the next homework, every homework will have a starting point, so you always will be able to override the content of your repository with the prepared starting point.

### The goal of this module’s homework

The goal of this homework is to get to know performance measurments techniques in React Native ecosystem.

### Checkpoints 💡

The homework repository contains periodic checkpoints for your convenience. You will see callouts denoting the current checkpoint throughout this instruction. They will look something like this:

> 💡 You are now here → `checkpoint-xyz`

Feel free to check out the corresponding branch of any given checkpoint if you’re struggling or simply want to compare your solution with ours.

With that out of the way, let’s start!

## Part 1: Performance Measurements for the Art Museum App

**Exceptionally, for this part of the homework we will be using the application we worked on during the workshop (Art Museum App) instead of the Lottery App that we're building along.** The reason is we have a nicely visible set of performance improvements in that app and that's why it's a perfect opportunity to get to know profilers tools better. We'll provide performance measurements for two versions of the app before and after the implemented improvements in order to compare the results and see the effect of our work.

In case you don't have the Art Museum App we were working on during the workshop please clone it from [this repository](https://github.com/callstack-workshops/abbott-module-11-workshop-exercises).

- Branch - Before implemented improvements checkpoint: [main](https://github.com/callstack-workshops/abbott-module-11-workshop-exercises)
- Branch - After implemented improvements checkpoint: [part-7](https://github.com/callstack-workshops/abbott-module-11-workshop-exercises/tree/part-7)

The goal of this part of the homework is to collect performance measurements for two versions of Exhibitions and Artworks screens - done before and after implemented improvements using multiple tools. **Remember to keep consistency between the measurements, you should use the same device (with the same OS version) during all measurements - the environment needs to be stable.**

All of the results should be stored in the Excel sheet where the average value will be calculated based on the provided measurements. We recommend using the prepared template: 

For each step (including steps 1, 2, 3, and 4) you will need to perform 7 measurements on a specific branch and screen, based on the presented steps:

1. Open the specified screen (make sure its state is fresh)
2. Start the measurement
3. Perform a sequence you would like to measure in the app
4. Stop the measurement
5. Write down results in the proper place in the Excel sheet

**In order to use FlashLight you need to use it with an Android device, so ideally with a physical device. In case you're not able to (for the sake of this exercise) you may use the emulator (from Android Studio), although keep in mind that your results will not be accurate, you should always run performance tests on physical devices.**

**Before running any tests make sure to specify an exact sequence you'll be following while measuring performance (for example scrolling to the 10th element in the list).**

**Remember to run performance tests not on the development flavor of the app. In order to run the non-dev version there are two options to choose from:**

- **You may use Android Studio to build a release version of the app and then perform tests on it**
- **You may run your app in a classic way using React Native CLI, but then you need to shake to open the dev menu select the Settings option, disable the JS Dev Mode, and reload the app**

You're good to start, finally...

<details>
  <summary>Step 1. Measure list performance of the Exhibitions screen (BEFORE - using the main branch) using Flashlight</summary><br>

  Set the main branch (version without improvements) and collect 7 measurements following above described steps. Remember to put all results into an Excel sheet. 

</details>

<details>
  <summary>Step 2. Measure list performance of the Artworks screen (BEFORE - using the main branch) using Flashlight</summary><br>

  Set the main branch (version without improvements) and collect 7 measurements following above described steps. Remember to put all results to an Excel sheet. 
  
</details>

<details>
  <summary>Step 3. Measure list performance of the Exhibitions screen (AFTER - using the part-7 branch) using Flashlight</summary><br>

  Set the part-7 branch (version with improvements) and collect 7 measurements following above described steps. Remember to put all results into an Excel sheet. 
</details>

<details>
  <summary>Step 4. Measure list performance of the Artworks screen (AFTER - using the part-7 branch) using Flashlight</summary><br>

  Set the part-7 branch (version with improvements) and collect 7 measurements following above described steps. Remember to put all results into an Excel sheet. 
</details>

<details>
  <summary>Step 5. Gather performance-related data using native toolst</summary><br>

  Provide additional results of measurements done with the usage of Android Studio or Xcode from the physical device you have, which will compare the before and after implemented improvements versions.

  You may repeat the same metrics like CPU or RAM usage, or you could provide something else (for example Animations Hitches metric using Xcode Instruments).
  
</details>

## Part 2: Improvements for Lotteries App (Homework App)

The second step of the homework will be to work on the performance of the Lotteries App's Home Screen, where we will focus on improving the number of re-renders needed to display the fully loaded state of the Home Screen.

In order to properly manage and control the improved state of the Home Screen we will also introduce performance tests written with the usage of the Reassure library that will allow us to monitor the number of re-renders throughout the project development.

<details>
  <summary>Step 1. Detect unnecessary re-renders while loading HomeScreen and apply modifications to get rid of them</summary><br>

  This particular task needs to be started by profiling the HomeScreen. 
    
  However, since it is the very first screen, that is opened while the app is initialized, we need to bring the AppEntryWrapper pattern that was presented during the workshops to be able to profile the React code in that scope.

  After performed profiling it's a time ro bring performance improvements to get rid of unnecessary re-renders.

  > 💡 You are now here → `part-1`
  
  > Changes: https://github.com/callstack-workshops/abbott-module-11-homework/compare/main...part-1
</details>

<details>
  <summary>Step 2. Introduce a performance test for the HomeScreen</summary><br>

  [Reassure documentation](https://callstack.github.io/reassure/docs/api)
</details>

<details>
  <summary>Step 3. Introduce a performance test for the LotteryDetails screen</summary><br>

  [Reassure documentation](https://callstack.github.io/reassure/docs/api)

  > 💡 You are now here → `part-2`
  
  > Changes: https://github.com/callstack-workshops/abbott-module-11-homework/compare/part-1...part-2
</details>

