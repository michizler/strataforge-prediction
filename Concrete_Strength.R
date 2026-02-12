# ---------- REGRESSION MODELS FOR CONCRETE STRENGTH -------------


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


# ----------------------------------------------------------------------------
# Define Objective
# ----------------------------------------------------------------------------

# We want to examine the possible linear relation between concrete strength and 
# more than one independent variable (predictors)



# ----------------------------------------------------------------------------
# Performing Regression Analysis
# ----------------------------------------------------------------------------


concrete_reduced <- concrete_data[, c("cement", "slag", "flyAsh", "water",
                                      "superPlasticizer", "coarseAgg",
                                      "fineAgg", "age", "concrete_strength")]


corrplot(cor(concrete_reduced))
#forward stepwise fitting
model_0 <- lm(concrete_strength ~ cement, concrete_reduced)
summary.lm(model_0) # 24.71

model_1 <- lm(concrete_strength ~ cement + superPlasticizer, concrete_reduced)
summary.lm(model_1) # 34.98

model_2 <- lm(concrete_strength ~ cement + superPlasticizer
                + age, concrete_reduced)
summary.lm(model_2) # 48.01

model_3 <- lm(concrete_strength ~ cement + superPlasticizer + water
                + age, concrete_reduced)
summary.lm(model_3) # 49.66

model_4 <- lm(concrete_strength ~ cement + superPlasticizer + water + fineAgg
              + age, concrete_reduced)
summary.lm(model_4) # 52.92

model_5 <- lm(concrete_strength ~ cement + superPlasticizer + water + fineAgg
              + coarseAgg + age, concrete_reduced)
summary.lm(model_5) # 56.81

model_6 <- lm(concrete_strength ~ cement + superPlasticizer + water + fineAgg
              + coarseAgg + slag + age, concrete_reduced)
summary.lm(model_6) # 59.43

model_7 <- lm(concrete_strength ~ cement + superPlasticizer + water + fineAgg
              + coarseAgg + slag + flyAsh + age, concrete_reduced)
summary.lm(model_7) # 61.25 -intercept, fine aggregate and coarse aggregate not statistically relevant

model_8 <- lm(concrete_strength ~ cement + superPlasticizer + water + fineAgg
              + coarseAgg + flyAsh + age, concrete_reduced)
summary.lm(model_8) # 57.3


# model_6 is the best model



# ----------------------------------------------------------------------------
#                           Test assumptions
# ----------------------------------------------------------------------------
# 1. Linearity

data.frame(colnames(concrete_reduced))

pairs(concrete_reduced[,c(9,1,5,4,8,2,6,7)], lower.panel = NULL, pch = 19,cex = 0.2)

plot(model_6, 1)

# predictor transformation
# log transforming age and superPlasticizer predictors
concrete_reduced_tfd <- concrete_reduced # create a new df for transformation ops
concrete_reduced_tfd$superPlasticizer <- log(concrete_reduced_tfd$superPlasticizer)
concrete_reduced_tfd$age <- log(concrete_reduced_tfd$age)
head(concrete_reduced_tfd) # contains -ve infinite values in 5th column
# handling -ve infinte values
concrete_reduced_tfd[sapply(concrete_reduced_tfd, is.infinite)] <- NA
concrete_clean <- na.omit(concrete_reduced_tfd)


model_9 <- lm(concrete_strength ~ cement + superPlasticizer + water
                 + age + slag, concrete_clean)
summary.lm(model_9)# 81.35

model_10 <- lm(concrete_strength ~ cement + superPlasticizer + water
              + age + slag + fineAgg, concrete_clean)
summary.lm(model_10) # doesn't improve model significantly

model_11 <- lm(concrete_strength ~ cement + superPlasticizer + water
               + age + slag + fineAgg + coarseAgg, concrete_clean)
summary.lm(model_11) # doesn't improve model significantly

# model 9 is the best

# retrying linearity assumption
data.frame(colnames(concrete_clean))

pairs(concrete_clean[,c(9,1,5,4,8,2)], lower.panel = NULL, pch = 19,cex = 0.2) # passed

# 2. Residuals independence
plot(model_9, 1) # roughly lies on the zero line. passed

# 3. normality of residuals
plot(model_9, 2) # all fitted to the diagonal. passed

# 4. homoscedasticity
plot(model_9, 3) # randomly scattered around the red line. passed

# 5. multicollinearity

vif(model_9) # all between 1 - 5. passed

# Regression Model is ;
# 23.914 + 0.097445*cement - 2.5451*superPlasticizer - 0.2374*water + 
# 9.75855*age + 0.0683*slag


# ------------------------ Logistic Regression ----------------------------
# Define objective
# We want to fit a possible Logistic regression between isFlyAsh dependent variable
# and multiple possible independent variables. Basically, We want our possible model
# to correctly predict the likelihood that our concrete mix contains fly ash


# Logistic regression analysis

# new df for logistic regression operations
concrete_lr <- concrete_data
concrete_lr$superPlasticizer <- log(concrete_lr$superPlasticizer)
concrete_lr$age <- log(concrete_lr$age)
# handling -ve infinte values
concrete_lr[sapply(concrete_lr, is.infinite)] <- NA
concrete_lr <- na.omit(concrete_lr)

concrete_lr <- concrete_lr %>%
  mutate(isFlyAsh = ifelse(isFlyAsh == "FALSE", 0, 1))
# FALSE = 0 and TRUE = 1

model_logistic_1 <- glm(isFlyAsh ~ cement + superPlasticizer + water + flyAsh +
                          age + slag + fineAgg + coarseAgg + concrete_category
                        + concrete_strength, data = concrete_lr, family = "binomial")
summary(model_logistic_1) # perfect separation or quasi-complete separation problem

model_logistic_2 <- glm(isFlyAsh ~ cement + superPlasticizer + water +
                          age + slag + fineAgg + coarseAgg,
                        data = concrete_lr, family = "binomial") # remove collinear predictors
summary(model_logistic_2) # AIC 143.05

Imp <- varImp(model_logistic_2, scale=FALSE) # check individual influential contribution
Imp

model_logistic_3 <- glm(isFlyAsh ~ cement + slag + fineAgg + water + coarseAgg,
                        data = concrete_lr, family = "binomial") # remove least influential variables
summary(model_logistic_3) # AIC 145.12

Imp <- varImp(model_logistic_3, scale=FALSE) # recheck
Imp

model_logistic_4 <- glm(isFlyAsh ~ cement + slag + fineAgg + coarseAgg,
                        data = concrete_lr, family = "binomial") # keep most imp variables
summary(model_logistic_4) # AIC 165.69

# model_logistic_3 is best model for the logistic regression

# ---------------------------------------------------------------------------
# -------------------- Testing assumptions ----------------------------------
# ---------------------------------------------------------------------------

# calculate pi values as probs
probs <- predict(model_logistic_3, data = concrete_lr, type = "response")
concrete_lr$probs <- probs

# calculate logit(pi) values as logits
logits <- log(probs/(1-probs))
concrete_lr$logits <- logits

data.frame(colnames(concrete_lr))

# Scatterplot
pairs(concrete_lr[,c(13,1,2,4,6,7)], lower.panel = NULL, upper.panel = panel.smooth,
      pch = 19,cex = 0.2)

# Influential values?
plot(model_logistic_3, which = 4, id.n = 3)

# Multicollinearity
vif(model_logistic_3)


# plotting fitted regression curve
ggplot(concrete_lr, aes(x=cement+slag+water+age+superPlasticizer+fineAgg+coarseAgg, y=isFlyAsh)) + geom_point() +
  stat_smooth(method="glm", color="green", se=FALSE,
              method.args = list(family=binomial))


# -------------------------------------------------------------------------
#                             Hypothesis testing
# -------------------------------------------------------------------------

# 1 coarse and fine concrete category are the same

# 𝐻0: 𝜇coarse = 𝜇fine
# 𝐻1: 𝜇coarse ≠ 𝜇fine
# one way ANOVA p = 0.05
# Assumptions 1-3 passed by dataset design

# Assumption 4
ggplot(concrete_data, aes(x = concrete_category, y = concrete_strength, fill = concrete_category)) +
  geom_boxplot() +
  labs(title = "Concrete Strength by Category",
       x = "Concrete Category",
       y = "Concrete Strength") +
  theme_minimal() +
  theme(legend.position = "none")

# Assumption 5
# H0: the variable follows a normal distribution
# H1: the variable does NOT follow a normal distribution

install.packages("RVAideMemoire")   # install and load required library
library(RVAideMemoire)

byf.shapiro(concrete_strength ~ concrete_category, data=concrete_data) # assumption failed

# Non-parametric test - Kruskal-Wallis
kruskal.test(concrete_strength ~ concrete_category, data=concrete_data)

# p-value of 0.3364 > 0.05 for kruskal test. we fail to reject H0
# No difference between both categories

# ---------------------------------------------------------------------------

# 2 noflyash and flyash are the same

# 𝐻0: 𝜇noflyash = 𝜇flyash
# 𝐻1: 𝜇noflyash ≠ 𝜇flyash
# ANOVA one-way test p = 0.05
# Assumptions 1-3 passed by dataset design

# Assumption 4
ggplot(concrete_data, aes(x = isFlyAsh, y = concrete_strength, fill = isFlyAsh)) +
  geom_boxplot() +
  labs(title = "Concrete Strength by Fly Ash Content",
       x = "Contains Fly Ash",
       y = "Concrete Strength (MPa)") +
  scale_fill_manual(values = c("FALSE" = "skyblue", "TRUE" = "lightgreen")) +
  theme_minimal()

# Assumption 5
# H0: the variable follows a normal distribution
# H1: the variable does NOT follow a normal distribution

byf.shapiro(concrete_strength ~ isFlyAsh, data=concrete_data) # Assumption failed

# Non-parametric test - Kruskal-Wallis
kruskal.test(concrete_strength ~ isFlyAsh, data=concrete_data)

# p-value of 0.2324 > 0.05 for kruskal test. we fail to reject H0
# No difference between both categories

# -------------------------------------------------------------------------

# Test of independence between both categories (isFlyAsh and concrete_category)
chiq_table <- table(concrete_data$concrete_category,
                       concrete_data$isFlyAsh)
chiq_table

chisq.test(chiq_table, correct = FALSE)
