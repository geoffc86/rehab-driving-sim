## 6.0 Software Design Description Document

## 6.1 Introduction
This document presents the architectural design for the Rehabilitation Driving Simulator project, a software suite which aims to help individuals re-learn how to drive after a traumatic brain injury by allowing users to experience a simulation of real-world driving.

## 6.1.1 System Objective
The goal of this project is to provide a user-friendly and realistic experience for people using the simulator. As a model, the project uses hardware and software in tight correspondence. The simulator will feature different courses the user can take to test and teach the user how to drive that will include different driving scenarios. The hardware will create feedback that will utilize movement to assist users to have a real life feeling of driving a car. The team will create and program different tracks that will be integrated to receive feedback from the hardware.

## 6.1.2 Hardware, Software, and Human Interfaces
#### 6.1.2.1 Hardware Interfaces:
#### 6.1.2.1.1 Network:
The base system, a Windows 10 PC, is connected to the internet via a wired LAN connection.
#### 6.1.2.1.2 Audio/Visual:
Three HD video monitors and two speakers are connected to the system via HDMI connections.
#### 6.1.2.1.3 Motion Simulation:
Two single degree-of-freedom screw motors and a “rumble” device in the seat are connected to the system.
#### 6.1.2.2 Software Interfaces:
The system interacts with the motion simulation hardware through purpose-built motion simulation software (Sim Commander and SimTools).
The top-level user software is primarily based upon commercial games that run on the Steam distribution and digital rights management platform.
The core of our team’s software - telemetry, content, and scheduler - interacts with the aforementioned motion simulation and top-level user software via their respective APIs and command-line arguments.
#### 6.1.2.3 Human Interfaces:
Human users interact with the system in 2 primary ways:
#### 6.1.2.3.1 Logitech wireless keyboard and touchpad connected by USB unifying receiver.
#### 6.1.2.3.2 XBox-branded, Logitech-manufactured steering wheel game controller connected by USB cable.
#### 6.1.2.3.3 Custom-built gas, brake, and clutch pedals connected by USB cable.

## CSCI Description
#### 6.2.1 Concept of Execution
System execution will begin with the experiment scheduler application, which will call the top-level user software with the appropriate parameters for test or training scenarios. The telemetry/data gathering functionality is enabled by default.

Regardless of whether the session constitutes a test or a training scenario, the user will be instructed to perform a sequence of driving maneuvers using the steering wheel and pedals as they would in a real car. Users will be expected to safely navigate a series of roads, adhering to realistic speed limits, stopping at stop signs, and negotiating traffic. Game logic and graphics processing will be handled by the top-level user software, and data about user performance will accessed by the telemetry functionality through the top-level user software’s API.

The telemetry functionality will record information about the user’s performance to a file for analysis and feedback. For training scenarios, the data gathered will be evaluated and used to provide feedback on what the user should concentrate on improving. For testing scenarios, the data gathered will be used as a yardstick for the user’s ongoing progress.

#### 6.2.2 Interface Design
The following sections provide visual diagrams detailing the how to the software will interface with the hardware.

#### 6.2.2.1 Interface Identification and Diagram

#### 6.2.2.2 Project Interactions:
The top-level software has integrated functionality that alerts the user both in real time and after the trial experiment. One shows them what they are doing as they drive (i.e. functions included on the dashboard which can be used as a HUD). The other is a result screen that may be accessed after the trial experiment which contains relevant data to said trial. The maps the users will practice on will be generated from the top-level software itself. The users will make accounts assigned to their names, resembling profiles. These profiles will log their individual progress and grow as more data is acquired.

## 6.3 Preliminary User Manual
The software will be started and controlled by the test administrator. Tests will be initiated from the Test Scheduler we build, implementing the supplied parameters. The user will be strapped into the simulator with no direct control over the software. The user is only required to supply throttle, brake, and steering inputs. Details on Test Scheduler usage TBD—test administrator will have scenarios to choose from and parameters to set.
