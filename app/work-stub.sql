use cumminsDB;

select * from client;

create table client (
	clientId int NOT NULL,
    clientName  varchar(30) NOT NULL,
    sector varchar(30) NOT NULL,
    headquarters varchar(30) NOT NULL,
    primary key (clientId)
);

select * from engine;

Create table engine (
engineId int NOT NULL,
engineName varchar(50) NOT NULL,
power varchar(20) NOT NULL,
torque varchar(20),
certification varchar(20),
primary key (engineId)

);

select * from engineDeployed;

drop table engineDeployed;

create table engineDeployed (
	engineDeployedId INT NOT NULL,
	engineId INT NOT NULL,
	clientId INT NOT NULL,
	trainSerialNumber varchar(13) NOT NULL,
	deployedDate DATE NOT NULL,
	totalFiredHours INT NOT NULL,
	totalStarts INT NOT NULL,
	lastMaintenanceDate DATE,
    Primary Key (engineDeployedId),
    Foreign Key (engineId) References engine(engineId),
    foreign key (clientId) References client(clientId)
);

select * from timeSeries;

drop table timeSeries;

create table timeSeries (
	Id INT NOT NULL Auto_Increment,
	engineDeployedId INT NOT NULL,
	dataCollectedDate DATE NOT NULL,
    output Decimal (12, 8) NOT NULL,
    heatRate Decimal (12, 8) NOT NULL,
    compressorEfficiency Decimal (12, 8) NOT NULL,
    availability Decimal (12, 8) NOT NULL,
    reliability Decimal (12, 8) NOT NULL,
    firedHours Decimal (12, 8) NOT NULL,
    trips INT NOT NULL,
    starts INT NOT NULL,
    Primary Key (Id),
    Foreign Key (engineDeployedId) References engineDeployed(engineDeployedId)
);

select * from clientLogin;

create table clientLogin (
	Id INT NOt null auto_increment,
	clientId int not null,
    clientUsername varchar(20) NOT NULL,
	clientPassword varchar(15) not null,
    primary key (Id),
    foreign key (clientId) references client(clientId)

);

select * from salesOrder;

drop table salesOrder;

create table salesOrder (
	orderId INT NOT NULL auto_increment,
    clientId int not null,
    engineId int not null,
    orderDate date not null,
    orderQuantity int not null,
    orderStatus varchar (20) not null,
    Primary key (orderID),
    foreign key (clientId) references client(clientId),
    foreign key (engineId) references engine(engineId)

);

create table clientNotes (
	Id INT NOT NULL auto_increment,
    clientId INT NOT NULL,
    employeeId INT Not null,
    notes TEXT NOT NULL,
    Primary Key (Id),
    foreign key (clientId) References client(clientId),
    foreign key (employeeId) references cumminsLogin(employeeId)
);
