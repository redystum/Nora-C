#include "utils.h"

#include <sys/stat.h>
#include <string.h>
#include <stdio.h>

int mkdir_p(const char *path) {
    char tmp[1024];
    char *p = NULL;
    size_t len;

    snprintf(tmp, sizeof(tmp), "%s", path);
    len = strlen(tmp);
    if (tmp[len - 1] == '/')
        tmp[len - 1] = 0;

    for (p = tmp + 1; *p; p++) {
        if (*p == '/') {
            *p = 0;
            if (mkdir(tmp, 0755) == -1) {
                return -1;
            }
            *p = '/';
        }
    }
    mkdir(tmp, 0755);

    struct stat st = {0};
    if (stat(path, &st) == -1) {
        return -1;
    }

    return 0;
}
