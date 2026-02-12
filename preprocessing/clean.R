# installing and loading necessary libraries
install.packages("corrplot")
install.packages("readxl") # Had to install this necessary library for reading excel files since samples
                            # were saved in excel format instead of csv
install.packages('ggplot2')
install.packages('dplyr')
install.packages('car') # for vif function. comes with the car package
install.packages('caret')


# load packages
library(readxl)
library(corrplot)
library(ggplot2) # get documentation for usage
library(dplyr)
library(car)
library(caret)


# ---------------------- MLR ----------------------------------------------
# Steps to be carried out

# 1. Load the data into R and briefly check the data
# 2. Define the objective of the regression analysis
# 3. Perform the linear regression analysis
# 4. Make sure the fitted model meets MLR assumptions
# 5. Report the results



# ---------------------------------------------------------------------------
# Loading the data + EDA preprocessing
# ---------------------------------------------------------------------------


# Load dataset
concrete_data = read_excel('concrete compressive strength.xlsx')

#preview
head(concrete_data)

# view columns
colnames(concrete_data) # long names

# Renaming columns
concrete_data <- concrete_data %>% 
  rename(
    cement = `Cement (component 1)(kg in a m^3 mixture)`,
    slag = `Blast Furnace Slag (component 2)(kg in a m^3 mixture)`,
    flyAsh = `Fly Ash (component 3)(kg in a m^3 mixture)`,
    water = `Water  (component 4)(kg in a m^3 mixture)`,
    superPlasticizer = `Superplasticizer (component 5)(kg in a m^3 mixture)`,
    coarseAgg = `Coarse Aggregate  (component 6)(kg in a m^3 mixture)`,
    fineAgg = `Fine Aggregate (component 7)(kg in a m^3 mixture)`,
    age = `Age (day)`,
    concrete_category= `Concrete Category`,
    isFlyAsh = `Contains Fly Ash`,
    concrete_strength = `Concrete compressive strength(MPa, megapascals)`
  )
str(concrete_data)

summary(concrete_data)
head(concrete_data)
colSums(is.na(concrete_data)) # CHECK FOR MISSING VALUES


ggplot(concrete_data, aes(cement)) + geom_histogram(bins = 30)
ggplot(concrete_data, aes(superPlasticizer)) + geom_histogram(bins = 30)
ggplot(concrete_data, aes(age)) + geom_histogram(bins = 30)
ggplot(concrete_data, aes(fineAgg)) + geom_histogram(bins = 30)
ggplot(concrete_data, aes(coarseAgg)) + geom_histogram(bins = 30)
ggplot(concrete_data, aes(concrete_strength)) +
  geom_histogram(bins = 30)

# Outliers?
ggplot(concrete_data, aes(y = cement)) + geom_boxplot()
ggplot(concrete_data, aes(y = water)) + geom_boxplot()
ggplot(concrete_data, aes(y = superPlasticizer)) + geom_boxplot()
ggplot(concrete_data, aes(y = age)) + geom_boxplot()
ggplot(concrete_data, aes(y = concrete_strength)) +
  geom_boxplot()