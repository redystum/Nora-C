# Libraries
LIBS=-lcurl -lcjson #-lm -pthread

# Compiler flags
CFLAGS=-Wall -Wextra -ggdb -std=c11 -pedantic -D_POSIX_C_SOURCE=200809L -Werror=vla

# Linker flags
LDFLAGS=

# Indentation flags
IFLAGS=-linux -brs -brf -br

## Program Definitions
PROGRAM_NAME=Nora
BUILD_DIR=build
PROGRAM=$(BUILD_DIR)/$(PROGRAM_NAME)

# --------------------------------------------------------------------------
# AUTOMATIC FILE DISCOVERY
# --------------------------------------------------------------------------

# 1. Find all .c files inside src/ and its subdirectories (core, element, etc.)
MODULE_SRCS := $(wildcard src/*/*.c)

# 2. Define the Main sources (root directory files)
MAIN_SRCS := main.c

# 3. Find all .c files inside tests/
TEST_SRCS := $(wildcard tests/*.c)

# 4. Combine them
ALL_SRCS := $(MAIN_SRCS) $(MODULE_SRCS) $(TEST_SRCS)

# 4. Convert .c filenames to .o filenames inside the BUILD_DIR
#    Example: src/core/web_core.c -> build/src/core/web_core.o
PROGRAM_OBJS := $(patsubst %.c, $(BUILD_DIR)/%.o, $(ALL_SRCS))

# --------------------------------------------------------------------------
# TARGETS
# --------------------------------------------------------------------------

.PHONY: clean all docs indent debugon

all: $(PROGRAM)

# Debug build
debugon: CFLAGS += -D DEBUG_ENABLED -g
debugon: $(PROGRAM)

# Optimization
OPTIMIZE_FLAGS=-O2
optimize: CFLAGS += $(OPTIMIZE_FLAGS)
optimize: LDFLAGS += $(OPTIMIZE_FLAGS)
optimize: $(PROGRAM)

# Linking the executable
$(PROGRAM): $(PROGRAM_OBJS)
	@mkdir -p $(BUILD_DIR)
	$(CC) -o $@ $(PROGRAM_OBJS) $(LIBS) $(LDFLAGS)
	@echo "Build successful: $(PROGRAM)"

# --------------------------------------------------------------------------
# COMPILATION RULES
# --------------------------------------------------------------------------

# 2. GENERIC MAGIC RULE
#    This handles main.c, utils.c, AND any file deep inside src/
#    $(dir $@) ensures the folder (e.g., build/src/window/) exists before compiling
$(BUILD_DIR)/%.o: %.c
	@mkdir -p $(dir $@)
	$(CC) $(CFLAGS) -c $< -o $@

# --------------------------------------------------------------------------
# UTILITIES
# --------------------------------------------------------------------------

clean:
	rm -f *.o core.* *~ *.bak
	rm -rf $(BUILD_DIR)

docs: Doxyfile
	doxygen Doxyfile

depend:
	$(CC) $(CFLAGS) -MM $(ALL_SRCS)

indent:
	indent $(IFLAGS) $(ALL_SRCS) *.h src/*/*.h && rm -f *~ src/*/*~

pmccabe:
	pmccabe -v $(ALL_SRCS)

cppcheck:
	cppcheck --enable=all --verbose --suppress=missingIncludeSystem $(ALL_SRCS) src/*/*.h

run: $(PROGRAM)
	./$(PROGRAM)

all_debugon: debugon all
